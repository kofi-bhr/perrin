import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

// GET handler for retrieving a single article by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`Articles API: Fetching article with ID: ${params.id}`);
    const client = await clientPromise;
    const db = client.db("perrindb");
    
    // Get specific article by ID, including all fields
    const article = await db
      .collection("articles")
      .findOne({ id: params.id });
    
    if (!article) {
      return NextResponse.json(
        { message: 'Article not found' },
        { status: 404 }
      );
    }
    
    console.log(`Articles API: Successfully retrieved article: ${article.title}`);
    return NextResponse.json(article);
  } catch (error) {
    console.error('Error retrieving article:', error);
    return NextResponse.json(
      { message: 'Error retrieving article', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT handler for updating an article by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    let body;
    
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { message: 'Invalid request body format', error: 'Request body must be valid JSON' },
        { status: 400 }
      );
    }
    
    // Validate required fields with more detailed errors
    const missingFields = [];
    if (!body.title) missingFields.push('title');
    if (!body.content) missingFields.push('content');
    if (!body.category) missingFields.push('category');
    if (!body.type) missingFields.push('type');
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: 'Missing required fields', fields: missingFields },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("perrindb");
    
    // Check if article exists
    const existingArticle = await db.collection("articles").findOne({ id });
    
    if (!existingArticle) {
      return NextResponse.json(
        { message: 'Article not found', id },
        { status: 404 }
      );
    }
    
    // Ensure the content is sanitized but preserves standard Quill formatting
    // Only allow tags that are supported by our Quill editor configuration
    let sanitizedContent = body.content;
    if (sanitizedContent) {
      // Basic sanitization - remove script tags and other potentially dangerous elements
      sanitizedContent = sanitizedContent
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
    }
    
    // Create a clean update object with only the fields we want to update
    // This prevents potential MongoDB errors with invalid fields
    const updateFields: {
      title: any;
      subtitle: any;
      content: any;
      excerpt: any;
      category: any;
      type: any;
      image: any;
      featured: boolean;
      date: any;
      authorName?: string;
      authorPosition?: string;
    } = {
      title: body.title,
      subtitle: body.subtitle || existingArticle.subtitle,
      content: sanitizedContent,
      excerpt: body.excerpt || existingArticle.excerpt,
      category: body.category,
      type: body.type,
      image: body.image || existingArticle.image,
      featured: typeof body.featured === 'boolean' ? body.featured : existingArticle.featured,
      date: body.date || existingArticle.date
    };
    
    // Add optional fields only if they exist in the request
    if (body.authorName !== undefined) updateFields.authorName = body.authorName;
    if (body.authorPosition !== undefined) updateFields.authorPosition = body.authorPosition;
    
    // Save the updated article with specific fields to update
    try {
      await db.collection("articles").updateOne(
        { id },
        { $set: updateFields }
      );
      
      // Return the updated article
      const updatedArticle = {
        ...existingArticle,
        ...updateFields,
        id // Ensure ID doesn't change
      };
      
      return NextResponse.json(updatedArticle);
    } catch (dbError) {
      console.error('MongoDB update error:', dbError);
      return NextResponse.json(
        { message: 'Error updating article in database', error: dbError instanceof Error ? dbError.message : 'Unknown database error' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { message: 'Error updating article', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 
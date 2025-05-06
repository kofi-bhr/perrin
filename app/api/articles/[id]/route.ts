import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

// GET handler for retrieving a single article by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("perrindb");
    
    // Find the article by ID
    const article = await db.collection("articles").findOne({ id });
    
    if (!article) {
      return NextResponse.json(
        { message: 'Article not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(article);
  } catch (error) {
    console.error('Error retrieving article:', error);
    return NextResponse.json(
      { message: 'Error retrieving article' },
      { status: 500 }
    );
  }
} 
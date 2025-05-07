import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { Article } from '../../../lib/articles';

// GET handler for retrieving articles
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("perrindb");
    
    // Get all articles from MongoDB, sorted by newest first
    const articles = await db
      .collection("articles")
      .find({})
      .sort({ _id: -1 })
      .toArray();
    
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error retrieving articles:', error);
    return NextResponse.json(
      { message: 'Error retrieving articles', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST handler for creating a new article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, excerpt, category, type, authorName, authorPosition, date, image, featured } = body;
    
    // Validate required fields
    if (!title || !content || !category || !type) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB with better error handling
    let client;
    try {
      client = await clientPromise;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      return NextResponse.json(
        { message: 'Database connection error', error: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      );
    }
    
    const db = client.db("perrindb");
    
    // Create a new article
    const newArticle: Article = {
      id: Date.now().toString(),
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + (content.length > 150 ? '...' : ''),
      category,
      type,
      authorName,
      authorPosition,
      date,
      image: image || "/news/placeholder-thumb-1.jpg",
      featured: featured || false
    };
    
    // Insert the article into MongoDB with better error handling
    try {
      await db.collection("articles").insertOne(newArticle);
    } catch (error) {
      console.error('MongoDB insert error:', error);
      return NextResponse.json(
        { message: 'Error inserting article', error: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(newArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { message: 'Error creating article', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Initialize database with sample articles if empty
export async function init() {
  try {
    const client = await clientPromise;
    const db = client.db("perrindb");
    
    // Check if articles collection is empty
    const count = await db.collection("articles").countDocuments();
    
    if (count === 0) {
      // Add default articles
      const defaultArticles: Article[] = [
        {
          id: "1",
          title: "India-US Tech Partnership Summit Focuses on AI Collaboration",
          date: "May 22, 2023",
          excerpt: "Leaders from both nations converged in New Delhi to discuss AI development standards, joint research initiatives, and market access for emerging technologies.",
          content: "Leaders from both nations converged in New Delhi to discuss AI development standards, joint research initiatives, and market access for emerging technologies.",
          image: "/news/placeholder-thumb-1.jpg",
          category: "Foreign Policy",
          type: "news",
          featured: false
        },
        {
          id: "2",
          title: "Breakthrough Carbon Capture Technology Shows 40% Efficiency Increase",
          date: "May 10, 2023",
          excerpt: "A new direct air capture method developed by researchers at MIT demonstrates significantly improved efficiency at lower costs, potentially accelerating climate mitigation efforts.",
          content: "A new direct air capture method developed by researchers at MIT demonstrates significantly improved efficiency at lower costs, potentially accelerating climate mitigation efforts.",
          image: "/news/placeholder-thumb-2.jpg",
          category: "Climate Action",
          type: "news",
          featured: true
        }
      ];
      
      await db.collection("articles").insertMany(defaultArticles);
    }
  } catch (error) {
    console.error('Error initializing articles:', error);
  }
} 
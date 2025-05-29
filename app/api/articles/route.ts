import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { Article } from '../../../lib/articles';

// GET handler for retrieving articles
export async function GET(request: NextRequest) {
  try {
    console.log('Articles API: Starting to fetch articles...');
    const client = await clientPromise;
    const db = client.db("perrindb");
    
    // Get all articles from MongoDB, sorted by newest first
    // Exclude the 'content' field to reduce response size for listings
    const articles = await db
      .collection("articles")
      .find({})
      .project({
        content: 0  // Exclude content field for better performance
      })
      .sort({ _id: -1 })
      .toArray();
    
    console.log(`Articles API: Successfully retrieved ${articles.length} articles`);
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
    const { title, subtitle, content, excerpt, category, type, authorName, authorPosition, date, image, featured } = body;
    
    // Validate required fields
    if (!title || !content || !category || !type || !subtitle) {
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
      subtitle,
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
          title: "AI Governance Framework Proposed by Perrin Institution Gains International Support",
          subtitle: "New policy recommendations aim to balance innovation with ethical considerations",
          date: "June 15, 2023",
          excerpt: "The Perrin Institution's comprehensive AI governance framework has received endorsements from policymakers and tech leaders across multiple countries, representing a major step forward in establishing global standards for artificial intelligence development and deployment.",
          content: "<p>The Perrin Institution's comprehensive AI governance framework has received endorsements from policymakers and tech leaders across multiple countries, representing a major step forward in establishing global standards for artificial intelligence development and deployment.</p><p>The framework, which emphasizes transparency, accountability, and human oversight, was developed through a collaborative process involving experts from academia, industry, and civil society organizations.</p><p>Key recommendations include establishing independent audit mechanisms, mandating impact assessments for high-risk AI systems, and creating international coordination bodies to address cross-border challenges.</p>",
          image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&h=700&q=80",
          category: "AI",
          type: "news",
          featured: true,
          authorName: "Dr. Elena Morrison",
          authorPosition: "Director, Human-Centered AI Laboratory"
        },
        {
          id: "2",
          title: "Breakthrough Carbon Capture Technology Shows 40% Efficiency Increase",
          subtitle: "Perrin researchers develop new method that could accelerate climate change mitigation efforts",
          date: "May 22, 2023",
          excerpt: "A new direct air capture method developed by researchers at the Perrin Institution demonstrates significantly improved efficiency at lower costs, potentially accelerating climate mitigation efforts globally.",
          content: "<p>A new direct air capture method developed by researchers at the Perrin Institution demonstrates significantly improved efficiency at lower costs, potentially accelerating climate mitigation efforts globally.</p><p>The technology, which uses novel materials and an optimized capture process, reduces energy requirements while increasing carbon dioxide absorption rates by approximately 40% compared to current commercial solutions.</p><p>Initial testing has shown promising results, with the system capable of capturing up to 2 metric tons of CO₂ per day at pilot scale. Researchers are now focused on scaling the technology and reducing manufacturing costs further to enable widespread deployment.</p>",
          image: "https://images.unsplash.com/photo-1569097293280-36d13ba6eb24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&h=700&q=80",
          category: "Climate Action",
          type: "news",
          featured: true,
          authorName: "Dr. Marcus Chen",
          authorPosition: "Senior Researcher"
        },
        {
          id: "3",
          title: "Policy Entrepreneurship Lab Launches Global Fellowship Program",
          subtitle: "Initiative will support emerging leaders in technology policy across five continents",
          date: "May 10, 2023",
          excerpt: "The Perrin Institution's Policy Entrepreneurship Laboratory has announced a new global fellowship program designed to nurture the next generation of technology policy innovators and bridge the gap between technical expertise and policy implementation.",
          content: "<p>The Perrin Institution's Policy Entrepreneurship Laboratory has announced a new global fellowship program designed to nurture the next generation of technology policy innovators and bridge the gap between technical expertise and policy implementation.</p><p>The highly competitive program will select 20 fellows annually from diverse backgrounds including government, academia, industry, and civil society. Fellows will receive mentorship, research support, and networking opportunities with leading policy experts.</p><p>The initiative aims to address the growing need for multidisciplinary approaches to complex technology governance challenges, with a particular focus on artificial intelligence, digital privacy, and platform regulation.</p>",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&h=700&q=80",
          category: "Education",
          type: "news",
          featured: true,
          authorName: "Sarah Johnson",
          authorPosition: "Program Director"
        },
        {
          id: "4",
          title: "New Study Finds Significant Gaps in Technology Regulation Across Developing Economies",
          subtitle: "Research highlights opportunities for knowledge sharing and capacity building",
          date: "April 25, 2023",
          excerpt: "A comprehensive study conducted by the International Studies Laboratory reveals substantial variation in regulatory frameworks for emerging technologies across developing economies, with potential implications for global governance efforts.",
          content: "<p>A comprehensive study conducted by the International Studies Laboratory reveals substantial variation in regulatory frameworks for emerging technologies across developing economies, with potential implications for global governance efforts.</p><p>The research, which examined policy approaches in 40 countries across Africa, Asia, and Latin America, identified common challenges including limited technical expertise within government agencies, inadequate funding for regulatory bodies, and difficulties in balancing innovation incentives with public interest protections.</p><p>Despite these challenges, the study also highlights several promising policy innovations and opportunities for South-South cooperation in building more effective governance systems.</p>",
          image: "https://images.unsplash.com/photo-1519834022362-cf872776bc7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&h=600&q=80",
          category: "Technology",
          type: "news",
          featured: false,
          authorName: "Dr. Leila Mwangi",
          authorPosition: "Lead Researcher"
        },
        {
          id: "5",
          title: "Opinion: Why Digital Privacy Must Be Treated as a Fundamental Right",
          subtitle: "The case for establishing stronger protections in an age of ubiquitous surveillance",
          date: "April 15, 2023",
          excerpt: "As digital technologies become increasingly embedded in our daily lives, the distinction between privacy as a consumer preference and privacy as a fundamental right has profound implications for how we design regulatory frameworks.",
          content: "<p>As digital technologies become increasingly embedded in our daily lives, the distinction between privacy as a consumer preference and privacy as a fundamental right has profound implications for how we design regulatory frameworks.</p><p>Current approaches that rely primarily on notice and consent mechanisms place an unreasonable burden on individuals while failing to address structural power imbalances between technology companies and users.</p><p>A rights-based approach would establish minimum standards that cannot be circumvented through complex terms of service or dark patterns, while still enabling innovation and personalized services within appropriate ethical boundaries.</p>",
          image: "https://images.unsplash.com/photo-1563237023-b1e970526dcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&h=600&q=80",
          category: "Technology",
          type: "opinion",
          featured: false,
          authorName: "Prof. Jonathan Carter",
          authorPosition: "Privacy Law Expert"
        },
        {
          id: "6",
          title: "Perrin Institution Partners with Global South Universities to Expand Technology Policy Research",
          subtitle: "Collaborative initiative aims to diversify perspectives in governance discussions",
          date: "April 3, 2023",
          excerpt: "The Perrin Institution has launched a major partnership with universities across Africa, Latin America, and South Asia to expand research on technology governance and ensure more diverse perspectives inform global policy development.",
          content: "<p>The Perrin Institution has launched a major partnership with universities across Africa, Latin America, and South Asia to expand research on technology governance and ensure more diverse perspectives inform global policy development.</p><p>The five-year initiative will establish joint research programs, facilitate faculty and student exchanges, and create new mechanisms for connecting academic research with policy implementation.</p><p>Initial focus areas include data governance frameworks, inclusive AI development, and digital infrastructure regulation, with an emphasis on addressing region-specific challenges while contributing to global governance conversations.</p>",
          image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&h=600&q=80",
          category: "Foreign Policy",
          type: "news",
          featured: false,
          authorName: "Dr. Miguel Santos",
          authorPosition: "International Relations Director"
        }
      ];
      
      await db.collection("articles").insertMany(defaultArticles);
      console.log('Database initialized with sample articles');
    }
  } catch (error) {
    console.error('Error initializing articles:', error);
    throw error;
  }
} 
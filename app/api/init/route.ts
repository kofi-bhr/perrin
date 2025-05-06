import { NextRequest, NextResponse } from 'next/server';
import { init } from '../articles/route';

// This route initializes the database with sample data if needed
export async function GET(request: NextRequest) {
  try {
    await init();
    return NextResponse.json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json(
      { message: 'Error initializing database' },
      { status: 500 }
    );
  }
} 
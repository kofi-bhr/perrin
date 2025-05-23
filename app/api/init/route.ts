import { NextRequest, NextResponse } from 'next/server';
import { init } from '../articles/route';

// This route initializes the database with sample data if needed
export async function GET(request: NextRequest) {
  try {
    await init();
    return NextResponse.json({ success: true, message: 'Database initialized successfully' });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error initializing database', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 
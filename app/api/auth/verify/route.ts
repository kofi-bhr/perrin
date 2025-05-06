import { NextRequest, NextResponse } from 'next/server';

// Keep the access code on the server side only
const EMPLOYEE_ACCESS_CODE = "perrinstaff2024";

export async function POST(request: NextRequest) {
  try {
    console.log('Auth request received');
    const body = await request.json();
    console.log('Request body:', body);
    const { accessCode } = body;

    console.log('Comparing access codes:', { 
      received: accessCode, 
      expected: EMPLOYEE_ACCESS_CODE,
      matches: accessCode === EMPLOYEE_ACCESS_CODE 
    });

    if (accessCode === EMPLOYEE_ACCESS_CODE) {
      console.log('Access granted');
      return NextResponse.json({ success: true });
    } else {
      console.log('Access denied');
      return NextResponse.json(
        { success: false, message: "Invalid access code" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
} 
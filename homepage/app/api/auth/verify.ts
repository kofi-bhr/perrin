import { NextResponse } from 'next/server';

// Keep the access code on the server side only
const EMPLOYEE_ACCESS_CODE = "perrinstaff2024";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { accessCode } = body;

    if (accessCode === EMPLOYEE_ACCESS_CODE) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid access code" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
} 
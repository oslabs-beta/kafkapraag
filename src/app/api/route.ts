import { NextResponse } from 'next/server';

export async function GET() {
   return NextResponse.json({ message: "Hello from server again!" });
}
 
export async function POST() {
   return NextResponse.json({ message: "Goodbye from server!" });
}
 
export async function PUT() {
   return NextResponse.json({ message: "F off from server!" });
}
 
export async function DELETE() {
   return NextResponse.json({ message: "Later from server!" });
}
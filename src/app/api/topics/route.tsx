import { NextResponse } from 'next/server';
import runAdmin from '../KafkaJS/admin'

export async function GET() {
   const topics = await runAdmin().catch(console.error);
   return NextResponse.json({ topics });
}

// Potential stretch feature: manipulate KafkaJS clients dynamically

// export async function POST() {
//    return NextResponse.json({ message: "Goodbye from server!" });
// }
 
// export async function PUT() {
//    return NextResponse.json({ message: "F off from server!" });
// }
 
// export async function DELETE() {
//    return NextResponse.json({ message: "Later from server!" });
// }
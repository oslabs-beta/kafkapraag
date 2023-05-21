import { NextResponse } from 'next/server';

export async function GET() {

   // fetch from jolokia localhost 8787
   const response = await fetch('http://127.0.0.1:8778/jolokia/read/kafka.server:type=BrokerTopicMetrics,name=BytesInPerSec');
   // parse the response
   let byteIn = await response.json();
      // console log the response, access what to send back
   console.log(byteIn)
   // send some of the data to frontend
   // OneMinuteRate, 
   return NextResponse.json({ OneMinuteBytesInRate: byteIn.value.OneMinuteRate});
   // Testing with Count (byte count) instead of OneMinuteBytesInRate
   // return NextResponse.json({ Count: byteIn.value.Count});
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
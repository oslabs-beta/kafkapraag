import { NextResponse } from 'next/server';

export async function GET() {

   // const response = await fetch('http://localhost:8778/jolokia/read/kafka.server:type=BrokerTopicMetrics,name=TotalProduceRequestsPerSec');
   // parse the response
   // let produceRequestRate = await response.json();
      // console log the response, access what to send back
   // console.log(produceRequestRate.value.OneMinuteRate)
   // send some of the data to frontend
   // OneMinuteRate, 
   // return NextResponse.json({ OneMinuteProduceRequestRate: produceRequestRate.value.OneMinuteRate});
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
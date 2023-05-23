import { NextResponse } from 'next/server';

export async function GET() {
   // fetch from jolokia localhost 8787
   const response = await fetch('http://127.0.0.1:8778/jolokia/read/kafka.server:type=BrokerTopicMetrics,name=TotalProduceRequestsPerSec');
   // parse the response
   let produceRequestRate = await response.json();
   const produceRate : number = produceRequestRate.value.OneMinuteRate
   // send some of the data to frontend
   return NextResponse.json({ OneMinuteProduceRequestRate: produceRate});
}

import { NextResponse } from 'next/server'

export async function GET (): Promise<NextResponse> {
  const response = await fetch('http://localhost:8778/jolokia/read/kafka.server:type=BrokerTopicMetrics,name=TotalProduceRequestsPerSec', { cache: 'no-store' })
  const produceRequestRate = await response.json()
  const produceRate: number = produceRequestRate.value.OneMinuteRate
  return NextResponse.json({ OneMinuteProduceRequestRate: produceRate })
}

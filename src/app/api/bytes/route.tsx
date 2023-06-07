import { NextResponse } from 'next/server'

export async function GET (): Promise<NextResponse> {
  const response = await fetch('http://127.0.0.1:8778/jolokia/read/kafka.server:type=BrokerTopicMetrics,name=BytesInPerSec', { cache: 'no-store' })
  const byteIn = await response.json()
  const bytes: number = byteIn.value.OneMinuteRate
  const count: number = byteIn.value.Count
  return NextResponse.json({ OneMinuteBytesInRate: bytes, Count: count })
}

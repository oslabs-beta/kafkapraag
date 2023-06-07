import { NextResponse } from 'next/server'
import runAdmin from '../KafkaJS/admin'

export async function GET (): Promise<NextResponse> {
  const topics = await runAdmin().catch(console.error)
  return NextResponse.json({ topics })
}

import { NextResponse } from 'next/server'

export async function GET (): Promise<NextResponse> {
  // const response = await fetch('')
  return NextResponse.json({ hello: 'hello there!' })
}

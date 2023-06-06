import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

export async function GET (): Promise<NextResponse> {
  // const response = await fetch('')
  return NextResponse.json({ hello: 'hello there!' })
}

// if (!process.env.MONGODB_URI) {
//   throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
// }

const uri = process.env.MONGODB_URI || 'mongodb://test'
const options = {}

const client = new MongoClient(uri, options)
const clientPromise: Promise<MongoClient> = client.connect()

export default clientPromise

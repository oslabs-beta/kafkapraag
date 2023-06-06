// import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

// export async function GET (): Promise<NextResponse> {
//   // const response = await fetch('')
//   return NextResponse.json({ hello: 'hello there!' })
// }

// if (!process.env.MONGODB_URI) {
//   throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
// }

const uri = process.env.MONGODB_URI
const options = {}

const client = new MongoClient(uri, options)
const clientPromise: Promise<MongoClient> = client.connect()
console.log('Pinged your deployment. You successfully connected to MongoDB!')

export default clientPromise
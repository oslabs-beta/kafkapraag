import { MongoClient } from 'mongodb'
// set up a connection uri: https://www.mongodb.com/docs/manual/reference/connection-string/
const uri: string = process.env.MONGODB_URI as string
const options = {}

const client = new MongoClient(uri, options)
const clientPromise: Promise<MongoClient> = client.connect()
console.log('Connected to MongoDB')

export default clientPromise

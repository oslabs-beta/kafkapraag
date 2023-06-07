import { NextResponse } from 'next/server'
import ProducerList from '../KafkaJS/producer'
const producers = new ProducerList()

export async function GET (): Promise<NextResponse> {
  const producerList = producers.listProducers()
  return NextResponse.json({ producerList })
}

export async function POST (req: Request, res: Response): Promise<NextResponse> {
  try {
    console.log('Hit producer POST route')
    // Process request body
    const data = await req.json()
    const { producerName, clientId, brokers, message } = data
    const interval = 1000 / message.rate
    // This topic will be dynamic in a future release
    const topic = 'kafkajs-producer-test-topic'
    // This content will be dynamic in a future release
    const messageVal = { value: 'Hello, this is a message!' }
    const messages = [messageVal, messageVal]
    // Wait for startProducer response
    const started = await producers.startProducer(producerName, interval, clientId, brokers)
    // Begin sending messages
    if (started) await producers.sendMessage(producerName, topic, messages)
    return NextResponse.json({ message: 'Producer started.' })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Producer could not start.' })
  }
}

export async function PATCH (req: Request, res: Response): Promise<NextResponse> {
  console.log('Hit consumer PATCH route')
  // Process request body
  const data = await req.json()
  const { producerName } = data
  // Stop the producer based on producerName in req body
  await producers.stopProducer(producerName)
  return NextResponse.json({ message: 'Producer stopped.' })
}

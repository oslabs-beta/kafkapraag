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
    const data = await req.json()
    const { producerName, clientId, brokers, message } = data
    const interval = 1000 / message.rate
    // example topic
    const topic = 'topic1'

    const started = await producers.startProducer(producerName, interval, clientId, brokers)
    if (started) await producers.sendMessage(producerName, topic)
  } catch (error) {
    console.log(error)
  }
  return NextResponse.json({ message: 'Producer started.' })
}

export async function PATCH (req: Request, res: Response): Promise<NextResponse> {
  console.log('Hit consumer PATCH route')
  const data = await req.json()
  const { producerName } = data
  await producers.stopProducer(producerName)
  return NextResponse.json({ message: 'Producer stopped.' })
}

import { NextResponse } from 'next/server';
import ProducerList from '../KafkaJS/producer';
const producers = new ProducerList();

export async function GET() {
  const producerList = producers.listProducers();
  return NextResponse.json({ producerList });
}

export async function POST(req: Request, res: Response) {
  console.log("Hit producer POST route");
  const data = await req.json();
  console.log(data);
  const { producerName, clientId, brokers} = data;
  // producerName: string, clientId: string, brokers: string[]

  await producers.startProducer(producerName, clientId, brokers);
  
  return NextResponse.json({ message: "Producer started." });
}

export async function PATCH(req: Request, res: Response) {
  console.log("Hit consumer PATCH route");
  const data = await req.json();
  console.log(data);
  const { producerName } = data;
  await producers.stopProducer(producerName);
  return NextResponse.json({ message: "Producer stopped." });
}
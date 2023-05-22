import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})

const producer = kafka.producer()

const runProducer = async () => {
  // Producing
  await producer.connect()
  await producer.send({
    topic: 'topic1',
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  })
}

export default runProducer;
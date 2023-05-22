import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test-group' })
const admin = kafka.admin()

const run = async () => {
  // Producing
  await producer.connect()
  await producer.send({
    topic: 'topic1',
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  })

  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'topic1', fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },

  })
  await admin.connect()
  const listTopics = await admin.listTopics();
  // console.log(listTopics)

  return listTopics;
}

export default run;
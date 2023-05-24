import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['127.0.0.1:9092']
})

const admin = kafka.admin()

const runAdmin = async () => {
  await admin.connect()
  const listTopics = await admin.listTopics();
  return listTopics;
}

export default runAdmin;
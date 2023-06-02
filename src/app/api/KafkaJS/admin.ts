import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka:9092']
})

const admin = kafka.admin()

const runAdmin = async () => {
  await admin.connect()
  const listTopics = await admin.listTopics();  
  console.log('listTopics',listTopics);
  
  const cluster = await admin.describeCluster();
  console.log('cluster',cluster);
  
  return listTopics;
}

export default runAdmin;
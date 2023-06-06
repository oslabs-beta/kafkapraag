// cluster must be externally connected, and connected to applicaton via KafkaJS
import { Kafka, type Consumer } from 'kafkajs'

interface Settings {
  clientId: string
  brokers: string[]
  groupId: string
  topic: string
  fromBeginning?: boolean
}

interface startConsumerReturn {
  startConsumer: ({ clientId, brokers, groupId, topic, fromBeginning = false }: Settings) => Promise<void>
  stopConsumer: () => Promise<void>
}

const NewConsumer = (): startConsumerReturn => {
  let consumer: null | Consumer = null

  const startConsumer = async ({ clientId, brokers, groupId, topic, fromBeginning = false }: Settings): Promise<void> => {
    const kafka = new Kafka({
      clientId,
      brokers
    })

    consumer = kafka.consumer({ groupId })
    await consumer.connect()
    /* Subscribe to a particular topic. If fromBeginning is true, display messages
    from beginning of log. Else only display messages after current time */
    await consumer.subscribe({ topic, fromBeginning })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          topic,
          partition,
          offset: message.offset,
          value: (message.value != null) ? message.value.toString() : null
        })
      }
    })
  }

  const stopConsumer: () => Promise<void> = async () => {
    await consumer?.disconnect()
  }
  return { startConsumer, stopConsumer }
}

export default NewConsumer

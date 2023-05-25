import { Kafka, Consumer } from 'kafkajs'

type Settings = {
  clientId: string,
  brokers: string[],
  groupId: string,
  topic: string,
  fromBeginning?: boolean
}

type startConsumerReturn = {
  startConsumer: ({ clientId, brokers, groupId, topic, fromBeginning = false }: Settings) => Promise<void>,
  stopConsumer: () => void
}

/*  
const settings = {
  clientId: "my-app",
  brokers: ["127.0.0.1:9092"],
  groupId: "test-group",
  topic: "topic1",
  fromBeginning: true
}
*/

const NewConsumer = (): startConsumerReturn => {
  let consumer: null | Consumer = null;
  
  const startConsumer = async ({ clientId, brokers, groupId, topic, fromBeginning = false }: Settings): Promise<void> => {
    // Connect to Kafka cluster
    const kafka = new Kafka({
      clientId,
      brokers
    });
    // Create a new consumer
    consumer = kafka.consumer({ groupId });
    // Connect the newly created consumer
    await consumer.connect();
    /* Subscribe to a particular topic. If fromBeginning is true, display messages 
    from beginning of log. Else only display messages after current time */
    await consumer.subscribe({ topic, fromBeginning })
    // Perform the following action for each message consumed from topic
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          topic, 
          partition,
          offset: message.offset,
          value: message.value.toString(),
        })
      },
    })
  }

  const stopConsumer: () => void = async () => { 
    await consumer?.disconnect();
  };

  return { startConsumer, stopConsumer };
}


export default NewConsumer;
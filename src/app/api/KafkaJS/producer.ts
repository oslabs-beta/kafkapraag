// cluster must be externally connected, and connected to applicaton via KafkaJS
import { Kafka, type Message, type Producer } from 'kafkajs'

// Creates a single producer, used in ProducerList
class DummyProducer {
  private readonly clientId: string
  private readonly brokers: string[]
  private readonly producer: Producer
  private readonly interval: number
  private activeInterval: ReturnType<typeof setInterval> | null

  constructor (clientId: string, brokers: string[], interval: number) {
    this.clientId = clientId
    this.brokers = brokers
    this.producer = this.createProducer()
    this.interval = interval
    this.activeInterval = null
  }

  private createProducer (): Producer {
    // Connect to cluster
    const kafka = new Kafka({
      clientId: this.clientId,
      brokers: this.brokers
    })
    // Create producer
    return kafka.producer()
  }

  public async start (): Promise<void> {
    try {
      // Connect producer
      await this.producer.connect()
    } catch (error) {
      console.log('Error connecting producer', error)
    }
  }

  public async sendMessage (topic: string, messages: Message[]): Promise<void> {
    this.activeInterval = setInterval((): void => {
      this.producer.send({
        topic,
        messages
      })
        .catch((err) => {
          console.log(err)
          if (this.activeInterval !== null) clearInterval(this.activeInterval)
        })
    }, this.interval)
  }

  public async stop (): Promise<void> {
    try {
      // Disconnect the producer
      if (this.activeInterval !== null) clearInterval(this.activeInterval)
      await this.producer.disconnect()
    } catch (error) {
      console.log('Error disconnecting producer', error)
    }
  }
}

// Dynamically start/send message from and/or stop producers.
export default class ProducerList {
  private producers: Record<string, DummyProducer>

  constructor () {
    this.producers = {}
  }

  public async startProducer (producerName: string, interval: number, clientId: string, brokers: string[]): Promise<boolean> {
    try {
      // If user enters a name for a producer that already exists
      if (Object.hasOwn(this.producers, producerName)) {
        throw new Error('Producer name already exists, choose new producer name.')
      }
      const newProducer = new DummyProducer(clientId, brokers, interval)
      await newProducer.start()
      // Add producer to producers object
      this.producers[producerName] = newProducer
      return true
    } catch (error) {
      console.log('Error instantiating new dummy producer', error)
      return false
    }
  }

  public async sendMessage (producerName: string, topic: string, messages: Message[] = [{ value: `Hello, this is a message from ${producerName}` }]): Promise<void> {
    try {
      // Check if producer exists
      if (!Object.hasOwn(this.producers, producerName)) {
        throw new Error('Producer does not exist.')
      }

      await this.producers[producerName].sendMessage(topic, messages)
    } catch (error) {
      console.log('Error sending messsage', error)
    }
  }

  public async stopProducer (producerName: string): Promise<void> {
    try {
      // Check if producer exists
      if (!Object.hasOwn(this.producers, producerName)) {
        throw new Error('Producer does not exist.')
      }
      // Disconnect & delete producer
      await this.producers[producerName].stop()
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this.producers[producerName]
    } catch (error) {
      console.log('Error stopping dummy producer', error)
    }
  }

  public listProducers (): string[] {
    return Object.keys(this.producers)
  }
}

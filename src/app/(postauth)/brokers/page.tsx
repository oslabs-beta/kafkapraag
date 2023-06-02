'use client'
import BytesPerSecond from '@components/BrokersBytesInGraph'

const Brokers: React.FC = () => {
  return (
    <div className="flex-column">
      <p className="text-center text-4xl font-light">Metrics</p>
      <div className="flex justify-center mt-10">
        <BytesPerSecond/>
      </div>
    </div>
  )
}

export default Brokers

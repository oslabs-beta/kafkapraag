import ProducerTesting from '@components/ProducerTesting'

const ProducersRequestRate: React.FC = () => {
  return (
    <div className="flex-column">
      <h2 className="text-center text-4xl font-light">Cluster Testing</h2>
      <div className="flex justify-center mt-10">
        <ProducerTesting/>
      </div>
    </div>
  )
}

export default ProducersRequestRate

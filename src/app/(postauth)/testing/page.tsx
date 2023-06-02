import ProducerTesting from '@components/ProducerTesting'

const ProducersRequestRate: React.FC = () => {
  return (
    <div className="flex-column">
      <p className="text-center text-4xl font-bold">Cluster Testing</p>
      <div className="m-10"></div>
      <div className="flex justify-center">
        <ProducerTesting/>
      </div>
    </div>
  )
}

export default ProducersRequestRate

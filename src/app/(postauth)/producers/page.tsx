import ProducersRequestRateGraph from '@components/ProducersRequestsGraph'

const ProducersRequestRate: React.FC = () => {
  return (
    <div className="flex-column">
      <p className="text-center text-4xl font-light">Producers Request Rate</p>
      <div className="flex justify-center mt-10">
        <ProducersRequestRateGraph/>
      </div>
    </div>
  )
}

export default ProducersRequestRate

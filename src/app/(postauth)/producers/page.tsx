"use client"
import ProducersRequestRateGraph from "@components/ProducersRequestsGraph";

const ProducersRequestRate = () => {

  return (
    <div className="flex-column">
      <p className="text-center text-4xl font-bold">Producers Request Rate</p>
      <div className="m-10"></div>
      <div className="flex justify-center">
        <ProducersRequestRateGraph/>
      </div>
    </div>
  )
}

export default ProducersRequestRate;
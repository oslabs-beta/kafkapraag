"use client"
import ProducersRate from "@components/ProducersRequestsGraph";
import BytesPerSecond from "@components/BrokersBytesInGraph";
import Topics from "@components/Topics";
import TopicsNames from "@components/TopicsNames";


const OverallMetrics = () => {

  return (
    <div className="flex-column">
      <p className="text-center text-4xl font-bold">Producers Request Rate</p>
      <div className="m-10"></div>
      <div className="flex justify-center">
        <ProducersRate/>
        <BytesPerSecond/>
        <Topics/>
        <TopicsNames/>
      </div>
    </div>
  )
}

export default OverallMetrics;
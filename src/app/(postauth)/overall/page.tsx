"use client"
import ProducersRate from "@components/ProducersRequestsGraph";
import BytesPerSecond from "@components/BrokersBytesInGraph";
import Topics from "@components/Topics";
import TopicsNames from "@components/TopicsNames";

const OverallMetrics = () => {
  return (
    <div className="">
      <p className="text-center text-4xl font-light">Producers Request Rate</p>
      <div className="mt-10 grid grid-cols-2">
        <ProducersRate/>
        <BytesPerSecond/>
        <Topics/>
        <TopicsNames/>
      </div>
    </div>
  )
}

export default OverallMetrics;
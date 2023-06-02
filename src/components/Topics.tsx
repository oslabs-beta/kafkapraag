"use client"
import { useState, useEffect } from "react"
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from "victory";

const Topics = () => {

    const [Topic, setTopic] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(()=>{
            fetch('/api/topics', { cache: 'no-store' })
            .then (data => data.json())
            .then (data => {
                // console.log('data is', data);

                //filter out '__consumer_offsets topic' for each consumer
                const filteredData = data.topics.filter((topic: string) => topic !== '__consumer_offsets');
                // console.log('filteredData: ', filteredData)
                setTopic(filteredData.length)
            })
        }, 2000)
        return () => {clearInterval(interval)};
    }, []);
    return(
        <div className="stats border-none shadow-none text-center">
            <div className="stat border-none shadow-none text-center">
                <div className="stat-title font-extralight">Total Topics</div>
                <div className="stat-value font-extralight text-primary">{Topic}</div>
            </div>
        </div>
    )
}

export default Topics;
"use client"
import { useState, useEffect } from "react"
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from "victory";

const Topics = () => {

    const [Topic, setTopic] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(()=>{
            fetch('/api/topics')
            .then (data => data.json())
            .then (data => {
                console.log('data is', data);
                setTopic(data.topics.length)
            })
        })
        return () => {clearInterval(interval)};
    }, []);
    return(
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-title">Total Topics</div>
                <div className="stat-value">{Topic}</div>
            </div>
        </div>
    )
}

export default Topics;
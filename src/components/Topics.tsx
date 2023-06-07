'use client'
import { useState, useEffect } from 'react'

const Topics: React.FC = () => {
  const [Topic, setTopic] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/topics', { cache: 'no-store' })
        .then(async data => await data.json())
        .then(data => {
          // filter '__consumer_offsets topic' from consumers
          const filteredData = data.topics.filter((topic: string) => topic !== '__consumer_offsets')
          setTopic(filteredData.length)
        })
        .catch((err) => { console.log(err) })
    }, 2000)
    return () => { clearInterval(interval) }
  }, [])
  return (
        <section className="stats border-none shadow-none text-center">
            <div className="stat border-none shadow-none text-center">
                <div className="stat-title font-extralight">Total Topics</div>
                <div className="stat-value font-extralight text-primary">{Topic}</div>
            </div>
        </section>
  )
}

export default Topics

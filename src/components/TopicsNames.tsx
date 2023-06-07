'use client'
import { useState, useEffect } from 'react'

const TopicsNames: React.FC = () => {
  const [tabled, setTable] = useState<any[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/topics')
        .then(async data => await data.json())
        .then(data => {
          const filteredData = data.topics.filter((topic: string) => topic !== '__consumer_offsets')
          const tableElements = []
          for (let i = 0; i < filteredData.length; i++) {
            const row = (
                        <tr>
                          <th>{i + 1}</th>
                          <td>{filteredData[i]}</td>
                        </tr>
            )
            tableElements.push(row)
          }
          setTable(tableElements)
        })
        .catch((err) => { console.log(err) })
    }, 1000)
    return () => { clearInterval(interval) }
  }, [])
  return (
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th className="bg-transparent font-light text-accent">Topic</th>
                        <th className="bg-transparent font-light text-accent">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {tabled}
                </tbody>
            </table>
            </div>
  )
}

export default TopicsNames

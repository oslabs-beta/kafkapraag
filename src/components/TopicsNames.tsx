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
            // const row = document.createElement('tr');
            // const num = document.createElement('th');
            // const topicName = document.createElement('td');

            // row.append(num);
            // row.append(topicName);

            // num.textContent = (i+1).toString();
            // topicName.textContent = filteredData[i];

            // tableElements.push(row);

            const row = (
                        <tr>
                          <th>{i + 1}</th>
                          <td>{filteredData[i]}</td>
                        </tr>
            )
            tableElements.push(row)
          }
          // setTable([tableElements]);
          console.log('tableElements', tableElements)

          setTable(tableElements)
          // consolelog doesnt reflect since it's async?
          // console.log('tabled', tabled)
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

                    {/* row 1 */}
                    {/* <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                    </tr> */}
                </tbody>
            </table>
            </div>
  )
}

export default TopicsNames

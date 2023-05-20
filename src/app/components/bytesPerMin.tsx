"use client"
import { useState, useEffect } from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

const dataPoints = [
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 5 },
  { x: 4, y: 4 },
  { x: 5, y: 7 }
]

const BytesPerMinute = () => {

  const [bytesPerMin, setBytesPerMin] = useState(dataPoints);
  useEffect(()=>{
    const interval = setInterval(()=>{
      fetch('/bytes') 
      .then(data => data.json())
      .then(data => {
        setBytesPerMin((curState) => {
          console.log(curState);
          const newState = [...curState, {
            x: Date.now(),
            y: data.OneMinuteBytesInRate
          }];
          newState.shift();
          return newState;
        })
        }
    )
  }, 1000)
  
  return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: "1px solid #ccc"}
        }}
        data={bytesPerMin}
      />
      </VictoryChart>
    </div>
  )
}

export default BytesPerMinute;
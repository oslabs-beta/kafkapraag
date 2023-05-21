"use client"
import { useState, useEffect } from "react";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from "victory";

// Set constant for how often to fetch data for populating graph
const FETCH_RATE: number = 100;

// BytesPerSecond graph component
const BytesPerSecond = () => {
  // const dataPoints = new Array(100).fill({ x: "", y: 0 });
  const dataPoints: {x: string, y: number}[] = [];
  for (let i = 0; i < 100; i++) {
    dataPoints.push({x: `${i}`, y: 0});
  }

  const [bytesPerMin, setBytesPerMin] = useState<{x: string, y: number}[]>(dataPoints);
  const [tickIndex, setTickIndex] = useState<number>(99);
  // const [domainValues, setDomainValues] = useState<{min: number, max: number}>({ min: 0, max: 0 });
  useEffect(()=>{
    // Fetch data at regular intervals using setInterval
    const interval = setInterval(()=>{
      // Fetch bytes in per second data from backend
      fetch('/bytes') 
      .then(data => data.json())
      .then(data => {
        // Update state with fetched data
        setBytesPerMin((curState) => {
          // Get current date
          const curDate = new Date();
          // Extract time from Date object
          const hours = curDate.getHours();
          const minutes = curDate.getMinutes();
          const seconds = curDate.getSeconds();
          const milliseconds = curDate.getMilliseconds();
          // Format the hours, minutes, and seconds into two-character strings
          const hoursFormatted = hours > 9 ? `${hours}` : `0${hours}`;
          const minutesFormatted = minutes > 9 ? `${minutes}` : `0${minutes}`;
          const secondsFormatted = seconds > 9 ? `${seconds}` : `0${seconds}`;
          // Create formatted time string from above
          const curTime = `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}:${milliseconds}`;
          // Create an updated state by: 
          // 1. Slicing off the oldest data point and spreading the rest of the data into a new array 
          // 2. Appending the new data point to the end of the array
          const newState = [...curState.slice(1), {
            x: curTime,
            y: parseFloat(data.OneMinuteBytesInRate.toFixed(2))
          }];         
          // Decrement tickIndex to make x-axis ticks scroll, reset to end
          setTickIndex((prev) => prev > 0 ? prev - 1 : bytesPerMin.length - 1);
          // Return the updated state to setBytesPerMin()
          return newState;
        })
      })
    }, FETCH_RATE)
  // Cleanup after component unmounts to prevent memory leaks
  return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-auto w-[600px]">
      <VictoryChart
      
      >
        <VictoryLabel
          text="Bytes in per second"
          x={225}  // Adjust the x-coordinate to position the label horizontally
          y={30}   // Adjust the y-coordinate to position the label vertically
          textAnchor="middle"  // Set textAnchor to "middle" for center alignment
        />
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}
          data={bytesPerMin}
          domain={{y: [0, 100]}}
        />
        <VictoryAxis crossAxis
          tickFormat={(tick, index) => (index === tickIndex || index === tickIndex - 50 || index === tickIndex + 50) ? tick.slice(0, 8) : ""}
        />
        <VictoryAxis crossAxis dependentAxis
        />
      </VictoryChart>
    </div>
  )
}

export default BytesPerSecond;
"use client"
import { useState, useEffect } from "react";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from "victory";

// Set constant for how often to fetch data for populating graph
const FETCH_RATE: number = 100;

// ProducersRate graph component
const ProducersRate = () => {
  // const dataPoints = new Array(100).fill({ x: "", y: 0 });
  const dataPoints: {x: string, y: number, timestamp: number}[] = [];
  for (let i = 0; i < 100; i++) {
    dataPoints.push({x: `${i}`, y: 0, timestamp: Date.now()});
  }

  const [ProducersRate, setProducersRate] = useState<{x: string, y: number,  timestamp: number}[]>(dataPoints);
  const [tickCache, setTickCache] = useState<string[]>(["", ""]);
  // const [domainValues, setDomainValues] = useState<{min: number, max: number}>({ min: 0, max: 0 });
  useEffect(()=>{
    // Set a variable to track the time; used for interval checking for setTickCache
    let timePrev: number = 0;
    // Fetch data at regular intervals using setInterval
    const interval = setInterval(()=>{
      // Fetch bytes in per second data from backend
      fetch('/api/brokers')
      .then(data => data.json())
      .then(data => {
        // Update state with fetched data
        console.log('data', data)
        setProducersRate((prevProducersRate) => {
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
          
          const newState = [...prevProducersRate.slice(1), {
            x: curTime,
            y: parseFloat(data.OneMinuteProduceRequestRate.toFixed(2)),
            timestamp: Date.now()
          }];         

          // Perform tick tracking for VictoryAxis
          // Check current time 
          const timeNow = Date.now();
          // If it's been 1000ms since assigning a tick to tickCache, the curTime seconds ends in 5 or 0
          if (timeNow - timePrev > 1000 && parseInt(curTime.slice(6, 8)) % 5 === 0) {
            // Reset the interval
            timePrev = timeNow;
            // Update the tickCache by removing the oldest tick and adding a new tick
            setTickCache((prevTickCache) => [prevTickCache[1], curTime]);
          }

          // Return the updated bytesPerSec array to setProducersRate()
          return newState;
        })
      })
    }, FETCH_RATE)
  // Cleanup after component unmounts to prevent memory leaks
  return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-auto w-[600px] bg-neutral-content rounded-3xl">
      <VictoryChart>
        <VictoryLabel
          text={`Producer Requests per Minute: ${Math.round(ProducersRate[ProducersRate.length - 1].y)}`}
          x={48}  // Adjust the x-coordinate to position the label horizontally
          y={30}   // Adjust the y-coordinate to position the label vertically
          // textAnchor="middle"  // Set textAnchor to "middle" for center alignment
        />
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}
          data={ProducersRate}
          domain={{y: [-1, 1]}}
          interpolation="basis"
        />
        <VictoryAxis crossAxis
          tickFormat={
            // Determines which ticks to render based on filter
            (tick, index) => {
              // If initial state ticks are cleared and tickCache contains a particular tick
              if (tick.length > 2 && tickCache.includes(tick)) {
                // Render that tick up to the seconds position, dropping the milliseconds
                return tick.slice(0, 8);
              } else {
                // Otherwise don't render that tick
                return "";
              }
            }
          }
        />
        <VictoryAxis crossAxis dependentAxis
        />
      </VictoryChart>
    </div>
  )
}

export default ProducersRate;
'use client'
import { useState, useEffect } from 'react'
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from 'victory'

interface Datapoint {
  x: string
  y: number
}

interface GraphTemplateProps {
  datapoints: Datapoint[]
  visibleTicks: string[]
}

// BytesPerSecond graph component
const GraphTemplate: React.FC<GraphTemplateProps> = ({ datapoints, visibleTicks }) => {
  return (
    <div className="h-auto w-[750px] bg-neutral-content rounded-3xl p-10">
      <VictoryChart>
        <VictoryLabel
          text={`Messages per second, one minute average: ${Math.round(datapoints[datapoints.length - 1].y)}`}
          x={48} // Adjust the x-coordinate to position the label horizontally
          y={30} // Adjust the y-coordinate to position the label vertically
          // textAnchor="middle"  // Set textAnchor to "middle" for center alignment
        />
        <VictoryLine
          style={{
            data: { stroke: '#c43a31' },
            parent: { border: '1px solid #ccc' }
          }}
          data={datapoints}
          domain={{ y: [0, 10] }}
          interpolation="basis"
        />
        <VictoryAxis crossAxis
          tickFormat={
            // Determines which ticks to render based on filter
            (tick, index) => {
              // If initial state ticks are cleared and tickCache contains a particular tick
              if (tick.length > 2 && visibleTicks.includes(tick)) {
                // Render that tick up to the seconds position, dropping the milliseconds
                return tick.slice(0, 8)
              } else {
                // Otherwise don't render that tick
                return ''
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

export default GraphTemplate

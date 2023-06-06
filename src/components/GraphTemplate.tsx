'use client'
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel, VictoryArea } from 'victory'
import { useThemeContext } from './Nav'

interface Datapoint {
  x: string
  y: number
}

interface GraphTemplateProps {
  datapoints: Datapoint[]
  fdatapoints: Datapoint[]
  visibleTicks: string[]
  title: string
}

// BytesPerSecond graph component
const GraphTemplate: React.FC<GraphTemplateProps> = ({ datapoints, fdatapoints, visibleTicks, title }) => {
  const chartTitle = `${title} : ${Math.round(datapoints[datapoints.length - 1].y)}`
  const theme = useThemeContext()

  return (
    <div className="h-auto w-auto">
      <VictoryChart>
          <VictoryLabel
            text= {chartTitle}
            style={{
              fontSize: 20,
              fill: theme === 'dark' ? '#d1d5db' : '#292524'
            }}
            x={48} // Adjust the x-coordinate to position the label horizontally
            y={30} // Adjust the y-coordinate to position the label vertically
            // textAnchor="middle"  // Set textAnchor to "middle" for center alignment
          />
        <VictoryLine
          style={{
            data: { stroke: '#c026d3' },
            parent: { border: '1px solid #ccc' }
          }}
          data={datapoints}
          domain={{ y: [0, 10] }}
          interpolation="basis"
        />
        <VictoryLine
          style={{
            data: { stroke: '#c43a31' },
            parent: { border: '1px solid #ccc' }
          }}
          data={fdatapoints}
          domain={{ y: [0, 10] }}
          interpolation="basis"
        />

        <VictoryArea
            data={datapoints}
            style={{
              data: {
                strokeWidth: 0,
                fill: 'rgba(192, 38, 211, .1)'
              }
            }}
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
          style={{
            axis: {
              stroke: theme === 'dark' ? '#d1d5db' : '#292524' // CHANGE COLOR OF Y-AXIS
            },
            tickLabels: {
              fill: theme === 'dark' ? '#d1d5db' : '#292524' // CHANGE COLOR OF Y-AXIS LABELS
            },
            grid: {
              stroke: theme === 'dark' ? '#4b5563' : '#e5e7eb', // CHANGE COLOR OF Y-AXIS GRID LINES
              strokeDasharray: '10'
            }
          }}
        />
        <VictoryAxis crossAxis dependentAxis
          style={{
            axis: {
              stroke: theme === 'dark' ? '#d1d5db' : '#292524' // CHANGE COLOR OF Y-AXIS
            },
            tickLabels: {
              fill: theme === 'dark' ? '#d1d5db' : '#292524' // CHANGE COLOR OF Y-AXIS LABELS
            },
            grid: {
              stroke: theme === 'dark' ? '#4b5563' : '#e5e7eb', // CHANGE COLOR OF Y-AXIS GRID LINES
              strokeDasharray: '7'
            }
          }}
        />
      </VictoryChart>
    </div>
  )
}

export default GraphTemplate

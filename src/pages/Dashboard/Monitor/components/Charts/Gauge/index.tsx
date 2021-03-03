import GaugeChart from 'bizcharts/es/plots/GaugeChart'


import React from 'react'
import autoHeight from '../autoHeight'


export interface GaugeProps {
  title: React.ReactNode
  color?: string
  height?: number
  bgColor?: number
  percent: number
  forceFit?: boolean
  style?: React.CSSProperties
  formatter: (value: string) => string
}

const Gauge: React.FC<GaugeProps> = (props) => {
  return (
    <GaugeChart
      title={{
        visible: true,
        text: '仪表盘',
      }}
      width={400}
      height={400}
      value={64}
      min={0}
      max={100}
      range={[0, 25, 50, 75, 100]}
      color={['#39B8FF', '#52619B', '#43E089', '#C0EDF3']}
      statistic={{
        visible: true,
        text: '优',
        color: '#30bf78',
      }}
    />
  )
}

export default autoHeight()(Gauge)

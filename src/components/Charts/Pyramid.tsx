import React from 'react'
import {
  Chart,
  Interval,
  Axis,
  Tooltip,
  Coordinate,
  Label,
  Legend,
  View,
  Guide,
  Facet,
  Util,
  Interaction,
} from 'bizcharts'

const { Text } = Guide
const data = [
  {
    action: '浏览网站',
    pv: 50000,
  },
  {
    action: '放入购物车',
    pv: 35000,
  },
  {
    action: '生成订单',
    pv: 25000,
  },
  {
    action: '支付订单',
    pv: 15000,
  },
  {
    action: '完成交易',
    pv: 8000,
  },
]
const cols = {
  percent: {
    nice: false,
  },
}

export function Pyramid() {
  return (
    <Chart height={600} data={data} scale={cols} padding={[20, 150, 100]} autoFit>
      <Axis visible={false} />
      <Tooltip />
      <Coordinate type="rect" transpose scale={[1, -1]} />
      <Legend />
      <Interval
        adjust="symmetric"
        position="action*pv"
        shape="pyramid"
        color={['action', ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF']]}
        label={[
          'action*pv',
          (action, pv) => {
            return { content: action + ' ' + pv }
          },
          {
            offset: 35,
            labelLine: {
              style: {
                lineWidth: 1,
                stroke: 'rgba(0, 0, 0, 0.15)',
              },
            },
          },
        ]}
      />
      <Interaction type="element-active" />
    </Chart>
  )
}

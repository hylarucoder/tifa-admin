import React from 'react'
import { TinyAreaChart } from 'bizcharts'

// 数据源
const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 6 },
  { year: '1994', value: 6 },
  { year: '1995', value: 8 },
  { year: '1996', value: 9 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
]

function Demo() {
  return <TinyAreaChart data={data} width={400} height={300} xField="year" yField="value" />
}

export default Demo

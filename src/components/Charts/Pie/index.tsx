import React from 'react'
import { PieChart } from 'bizcharts'

export default (props: any) => {
  return <PieChart
    angleField={'value'}
    colorField={'type'}
    data={
    [
      {
        'type': "t1",
        'value': 27,
      },
      {
        'type': "t2",
        'value': 27,
      },
      {
        'type': "t3",
        'value': 27,
      },
      {
        'type': "t4",
        'value': 27,
      },
      {
        'type': "t5",
        'value': 27,
      },
    ]
  } />
}

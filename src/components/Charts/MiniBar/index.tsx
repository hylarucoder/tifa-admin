import React from 'react'
import { ProgressChart } from 'bizcharts'
import autoHeight from '@/components/Charts/autoHeight'

export default autoHeight()(() => {
  return <ProgressChart width={200} height={30} percent={0.8} />
})

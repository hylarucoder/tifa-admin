import React, { useState, useEffect } from "react"
import { Chart, Point, Line, Area, Tooltip, Axis, Coordinate } from "bizcharts"
import DataSet from "@antv/data-set"

const data = [
  { item: "Design", a: 70, b: 30 },
  { item: "Development", a: 60, b: 70 },
  { item: "Marketing", a: 50, b: 60 },
  { item: "Users", a: 40, b: 50 },
  { item: "Test", a: 60, b: 70 },
  { item: "Language", a: 70, b: 50 },
  { item: "Technology", a: 50, b: 40 },
  { item: "Support", a: 30, b: 40 },
  { item: "Sales", a: 60, b: 40 },
  { item: "UX", a: 50, b: 60 },
]

const tooltipConfig = {
  shared: true, // 合并数据项
  follow: true, // tooltip 跟随鼠标
  showCrosshairs: true, // 展示 crosshairs
  crosshairs: {
    // 配置 crosshairs 样式
    type: "xy", // crosshairs 类型
    line: {
      // crosshairs 线样式
      style: {
        stroke: "#565656",
        lineDash: [4],
      },
    },
  },
}

export function RadarChart() {
  const { DataView } = DataSet
  const dv = new DataView().source(data)
  dv.transform({
    type: "fold",
    fields: ["a", "b"], // 展开字段集
    key: "user", // key字段
    value: "score", // value字段
  })

  const newData = dv.rows
  console.log("data", data)
  const axisConfig = {
    label: {
      offset: 25,
    },
    tickLine: {
      length: 20,
    },
  }

  return (
    <Chart
      height={400}
      data={newData}
      autoFit
      scale={{
        score: {
          min: 0,
          max: 90,
        },
      }}
      interactions={["legend-highlight"]}
    >
      <Coordinate type="polar" radius={0.8} />
      <Tooltip {...tooltipConfig} />
      <Point position="item*score" color="user" shape="circle" />
      <Line position="item*score" color="user" size="2" />
      <Area position="item*score" color="user" />
      <Axis name="item" {...axisConfig} />
    </Chart>
  )
}

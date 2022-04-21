import React from "react"
import "./App.css"
import Router from "@/Router"
import { ConfigProvider } from "antd"

import { createZStore, ZProvider } from "./hooks/useZStore"

function Main() {
  return <Router />
}

export const App: React.FC = (props: { children?: React.ReactNode }) => {
  return (
    <ZProvider createStore={createZStore}>
      <ConfigProvider space={{ size: "small" }} componentSize={"small"}>
        <Main />
      </ConfigProvider>
    </ZProvider>
  )
}

export default App

import React from "react"
import "./App.css"
import Router from "@/Router"

import { createZStore, ZProvider } from "./hooks/useZStore"

function Main() {
  return <Router />
}

export const App: React.FC = (props: { children?: React.ReactNode }) => {
  return (
    <ZProvider createStore={createZStore}>
      <Main />
    </ZProvider>
  )
}

export default App

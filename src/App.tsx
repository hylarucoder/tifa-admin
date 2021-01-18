import React, { useEffect } from 'react'
import { ProvideStore, useGlobalStore } from './hooks/useStore'
import Router from './Router'

function Main() {
  const store = useGlobalStore()
  useEffect(() => {
    /**
     * 向服务器发起请求，如果测试
     */
    store.initialize()
  }, [])
  return <Router />
}

const App: React.FC = (props: { children?: React.ReactNode }) => {
  console.log(props)
  return (
    <ProvideStore>
      <Main />
    </ProvideStore>
  )
}

export default App

import React, { useEffect } from 'react'
import { ProvideStore, useGlobalStore } from './hooks/useStore'
import Router from './Router'

function Main() {
  const store = useGlobalStore()
  useEffect(() => {
    // TODO: login
    // store.login();
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

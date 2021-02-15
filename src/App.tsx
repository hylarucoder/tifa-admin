import React, { useEffect } from 'react'
import { ProvideStore, useGlobalStore } from './hooks/useStore'
import Router from './Router'
import { fetchInitialData } from '@/api/login'
import { PageLoading } from '@ant-design/pro-layout'
import { useBoolean } from '@/hooks/useBoolean'

function Main() {
  const initializer = useBoolean(false)
  const store = useGlobalStore()
  const initial = async () => {
    try {
      const resp = await fetchInitialData()
      store.initialize(resp)
    } catch (e) {
    }
    initializer.setTrue()
  }
  useEffect(() => {
    initial()
  }, [initializer.value])
  if (initializer.value) {
    return <Router />
  } else {
    return <PageLoading />
  }
}

const App: React.FC = (props: { children?: React.ReactNode }) => {
  return (
    <ProvideStore>
      <Main />
    </ProvideStore>
  )
}

export default App

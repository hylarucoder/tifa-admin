import React, { useEffect } from 'react'
import './App.css'
import { ProvideStore, useGlobalStore } from '@/hooks/useStore'
import { useBoolean } from '@/hooks/useBoolean'
import Router from '@/Router'
import { PageLoading } from '@ant-design/pro-layout'
import { fetchInitialData } from '@/api/login'
import { ApolloProvider, useQuery } from '@apollo/client'
import { client } from '@/graphql/client'

import {Query} from "@/graphql/types"

function Main() {
  const initializer = useBoolean(false)
  const store = useGlobalStore()
  const initial = async () => {
    try {
      useQuery(Query.healthCheck)
      const resp = await fetchInitialData()
      store.initialize(resp)
    } catch (e) {}
    initializer.setTrue()
  }
  useEffect(() => {
    initial()
  }, [initial, initializer.value])
  if (initializer.value) {
    return <Router />
  } else {
    return <PageLoading />
  }
}

export const App: React.FC = (props: { children?: React.ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <ProvideStore>
        <Main />
      </ProvideStore>
    </ApolloProvider>
  )
}

export default App

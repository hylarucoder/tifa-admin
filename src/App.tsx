import React, { useEffect } from "react"
import "./App.css"
import { ProvideStore, useGlobalStore } from "@/hooks/useStore"
import { useBoolean } from "@/hooks/useBoolean"
import Router from "@/Router"
import { PageLoading } from "@ant-design/pro-layout"
import { fetchInitialData } from "@/api/login"
import { ApolloProvider, useQuery } from "@apollo/client"
import { client } from "@/graphql/client"
import { useInitialCheckQuery } from "@/graphql/schema"

function Main() {
  const store = useGlobalStore()
  const { data, loading, error } = useInitialCheckQuery()
  if (loading) {
    return <PageLoading />
  }
  if (data) {
    store.initialize(data?.profile)
  }
  if (error) {
    store.logout()
  }
  return <Router />
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

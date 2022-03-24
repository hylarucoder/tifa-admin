import React, {useEffect} from "react"
import "./App.css"
import {ProvideStore, useGlobalStore} from "@/hooks/useStore"
import Router from "@/Router"
import {PageLoading} from "@ant-design/pro-layout"

function Main() {
    const store = useGlobalStore()
    // return <PageLoading />
    return <Router/>
}

export const App: React.FC = (props: { children?: React.ReactNode }) => {
    return (
        <ProvideStore>
            <Main/>
        </ProvideStore>
    )
}

export default App

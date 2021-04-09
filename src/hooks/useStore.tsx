import React, { useEffect } from "react"
import { useLocalObservable } from "mobx-react"
import { action, toJS } from "mobx"

type MTabRoute = {
  title: string
  key: string
  url: string
}

export interface TInitialState {
  loggedIn: boolean
  tabRoutes: MTabRoute[]
  tabRouteActiveKey: string
}

export interface MGlobalStore extends TInitialState {
  initialize: Function
  login: Function
  logout: Function
  addOrActiveTabRoute: Function
  removeTabRoute: Function
  activeTabRoute: Function
}

export const INITIAL_STORE: TInitialState = {
  loggedIn: false,
  tabRoutes: [
    {
      title: "欢迎页面",
      key: "/welcome",
      url: "/welcome",
    },
  ],
  tabRouteActiveKey: "/welcome",
}

export const StoreContext = React.createContext(INITIAL_STORE)

export const useGlobalStore = (): MGlobalStore => {
  return React.useContext(StoreContext) as MGlobalStore
}

export function useGlobalProviderStore() {
  const store = useLocalObservable(() => {
    return {
      ...INITIAL_STORE,
      login: action(() => {
        store.loggedIn = true
      }),
      logout: action(() => {
        store.loggedIn = false
      }),
      initialize: action((data?: any) => {
        if (data) {
          store.loggedIn = true
        }
      }),
      addOrActiveTabRoute(tabRoute: MTabRoute) {
        console.log("tab", tabRoute)
        const hasKey = store.tabRoutes.filter((_) => _.key == tabRoute.key).length
        if (!hasKey) {
          store.tabRoutes.push(tabRoute)
        }
        store.tabRouteActiveKey = tabRoute.key
      },
      removeTabRoute(routeKey: string) {
        if (store.tabRouteActiveKey != routeKey) {
          store.tabRoutes = store.tabRoutes.filter((_) => _.key != routeKey)
        } else {
          const tabIndex = store.tabRoutes.findIndex((_) => _.key == routeKey)
          store.tabRoutes = store.tabRoutes.filter((_) => _.key != routeKey)
          if (tabIndex - 1 >= 0) {
            store.tabRouteActiveKey = store.tabRoutes[tabIndex - 1].key
          }
        }
      },
      activeTabRoute(routeKey: string) {
        store.tabRouteActiveKey = routeKey
      },
    }
  })

  useEffect(() => {}, [])

  // Return the user object and auth methods
  return store
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function ProvideStore({ children }: { children: React.ReactNode }) {
  const globalStore = useGlobalProviderStore()
  return <StoreContext.Provider value={globalStore}> {children} </StoreContext.Provider>
}

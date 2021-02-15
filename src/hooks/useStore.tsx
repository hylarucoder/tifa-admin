import React, { useEffect } from 'react'
import { useLocalObservable } from 'mobx-react'
import { action } from 'mobx'

export interface TInitialState {
  loggedIn: boolean
}

export interface MGlobalStore extends TInitialState {
  initialize: Function
  login: Function
  logout: Function
}

export const INITIAL_STORE: TInitialState = {
  loggedIn: false,
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
    }
  })

  useEffect(() => {
  }, [])

  // Return the user object and auth methods
  return store
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function ProvideStore({ children }: { children: React.ReactNode }) {
  const globalStore = useGlobalProviderStore()
  return <StoreContext.Provider value={globalStore}> {children} </StoreContext.Provider>
}

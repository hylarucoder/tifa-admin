import React, { useEffect } from 'react'
import { useLocalObservable } from 'mobx-react'
import { action } from 'mobx'

export interface TInitialState {
  loginedIn: boolean
}

export interface MGlobalStore extends TInitialState {
  login: Function
  logout: Function
}

export const INITIAL_STORE: TInitialState = {
  loginedIn: false,
}

export const StoreContext = React.createContext(INITIAL_STORE)

export const useGlobalStore = (): MGlobalStore => {
  // @ts-ignore
  return React.useContext(StoreContext)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useGlobalProviderStore() {
  const store = useLocalObservable(() => {
    return {
      ...INITIAL_STORE,
      login: action(() => {
        store.loginedIn = true
      }),
      logout: action(() => {
        store.loginedIn = false
      }),
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

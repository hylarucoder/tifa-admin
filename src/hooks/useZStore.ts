import create from "zustand"
import createContext from "zustand/context"

type MTabRoute = {
  title: string
  key: string
  url: string
}

type TState = {
  bears: number
  increase: (by: number) => void
  loggedIn: boolean
  tabRoutes: MTabRoute[]
  tabRouteActiveKey: string
  initialize: Function
  login: Function
  logout: () => void
  addOrActiveTabRoute?: Function
  removeTabRoute?: Function
  activeTabRoute?: Function
}

export const INITIAL_STORE = {
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

const { Provider, useStore } = createContext<TState>()

export const ZProvider = Provider
export const useZStore = useStore

export const createZStore = () =>
  create<TState>((set) => ({
    ...INITIAL_STORE,
    bears: 0,
    increase: (by) => set((state) => ({ bears: state.bears + by })),
    login: () =>
      set({
        loggedIn: true,
      }),
    logout: () =>
      set({
        loggedIn: false,
      }),
    initialize: (data?: any) =>
      set({
        loggedIn: true,
      }),
  }))

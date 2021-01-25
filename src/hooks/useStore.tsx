import React, { useEffect } from 'react'
import { useLocalObservable } from 'mobx-react'
import { action } from 'mobx'

export type TProfile = {
  name: string
  avatar: string
  userid: string
  email: string
  signature: string
  title: string
  group: string
  tags: {
    id: string
    name: string
  }[]
  notice: {
    id: string
    title: string
    content: string
  }[]
  noticeCount: Number
  noticeUnreadCount: Number
  country: string
  geographic: {
    province: {
      id: Number
      name: string
      code: string
    }
    city: {
      id: Number
      name: string
      code: string
    }
    county: {
      id: Number
      name: string
      code: string
    }
  }
  address: string
  phone: string
}

export interface TInitialState {
  isInitialized: boolean
  loggedIn: boolean
  profile: TProfile
}

export interface MGlobalStore extends TInitialState {
  initialize: Function
  login: Function
  logout: Function
}

export const INITIAL_STORE: TInitialState = {
  loggedIn: true,
  isInitialized: false,
  profile: {
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    tags: [
      {
        id: '0',
        name: '很有想法的',
      },
      {
        id: '1',
        name: '专注设计',
      },
      {
        id: '2',
        name: '辣~',
      },
      {
        id: '3',
        name: '大长腿',
      },
      {
        id: '4',
        name: '川妹子',
      },
      {
        id: '5',
        name: '海纳百川',
      },
    ],
    notice: [],
    noticeCount: 12,
    noticeUnreadCount: 11,
    country: 'China',
    geographic: {
      province: {
        id: 1,
        name: '浙江省',
        code: '330000',
      },
      city: {
        id: 2,
        name: '杭州市',
        code: '330100',
      },
      county: {
        id: 4,
        name: '余杭',
        code: '330101',
      },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
  },
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
      initialize: action((initialData: any) => {
        store.loggedIn = true
        store.isInitialized = true
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

export const useProfile = (): TProfile => {
  const store = useGlobalStore()
  return store.profile
}

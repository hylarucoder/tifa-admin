import React, { lazy, LazyExoticComponent, Suspense, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Layout, Menu, Tabs } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons'

import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom'
import { layoutRoutes, layoutRoutesByPath } from '@/routes'
import GlobalHeaderRight from '@/components/GlobalHeaderRight'
import { PageLoading } from '@ant-design/pro-layout'
import Login from '@/pages/Common/Login'
import Error403 from './pages/Common/Error403'
import Error404 from './pages/Common/Error404'
import Error500 from './pages/Common/Error500'
import { useGlobalStore } from '@/hooks/useStore'
import { Content, Header } from 'antd/es/layout/layout'
import { observer } from 'mobx-react'

const { Sider } = Layout
const { SubMenu } = Menu

const { TabPane } = Tabs

type PrivateRouteProps = {
  children: React.ReactNode
  path: string
  exact?: boolean
  rest?: never
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  path,
  exact,
  ...rest
}: PrivateRouteProps) => {
  const store = useGlobalStore()
  const loggedIn = store.loggedIn
  console.log(store.loggedIn, '??')
  return (
    <Route
      path={path}
      exact={exact}
      {...rest}
      render={(props) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

const SiderMenu = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <Sider
      collapsed={collapsed}
      onCollapse={() => {}}
      style={{
        width: 208,
        background: '#FFF',
      }}
    >
      <div className="logo">CyberCity Admin</div>
      <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
        {layoutRoutes.map((node) => {
          if (!node.routes) {
            return (
              <Menu.Item key={node.path} icon={<PieChartOutlined />}>
                <Link to={node.path}>{node.name}</Link>
              </Menu.Item>
            )
          }
          return (
            <SubMenu key={node.name} icon={<UserOutlined />} title={node.name}>
              {node.routes.map((node) => {
                return (
                  <Menu.Item key={node.path}>
                    <Link to={node.path}>{node.name}</Link>
                  </Menu.Item>
                )
              })}
            </SubMenu>
          )
        })}
      </Menu>
    </Sider>
  )
}

const CurrentTabPanel = observer(({ path }: { path: string }) => {
  const node = layoutRoutesByPath.get(path)
  console.log('--> node', node)
  if (!node) {
    return <div>Not Found</div>
  }
  if (node.baseComponent) {
    const Component = (node.component as unknown) as React.Component
    const BaseComponent = (node.baseComponent as unknown) as React.Component

    return (
      <Suspense fallback={<PageLoading />}>
        {/* @ts-ignore*/}
        <BaseComponent>
          {/* @ts-ignore*/}
          <Component />
        </BaseComponent>
      </Suspense>
    )
  }
  const Component = (node.component as unknown) as React.Component

  return (
    <Suspense fallback={<PageLoading />}>
      {/* @ts-ignore*/}
      <Component />
    </Suspense>
  )
})

const MultiTabContent = () => {
  const history = useHistory()
  const store = useGlobalStore()
  const activeTab = store.activeTab
  const tabs = store.tabs
  useEffect(() => {
    return history.listen((location) => {
      console.log(`You changed the page to: ${location.pathname}`)
      store.editCurrentPath(location.pathname)
      store.addOrNewTab(location.pathname)
    })
  }, [history, store])
  const onEditTab = () => {}
  const onChangeTab = (activeKey: string) => {
    history.push(activeKey)
  }
  const onTabClick = () => {}
  console.log('---> tags', tabs)
  return (
    <Content>
      <Tabs
        hideAdd
        size={'small'}
        onTabClick={onTabClick}
        onEdit={onEditTab}
        onChange={onChangeTab}
        activeKey={activeTab}
        type="editable-card"
      >
        {tabs.map((panel) => (
          // 这里有可优化空间, 懒加载
          <TabPane tab={panel.title} key={panel.path}>
            <CurrentTabPanel path={panel.path} />
          </TabPane>
        ))}
      </Tabs>
    </Content>
  )
}

const MultiTabLayout = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SiderMenu collapsed={collapsed} />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => {
              setCollapsed(!collapsed)
            },
          })}
          <GlobalHeaderRight />
        </Header>
        <MultiTabContent />
      </Layout>
    </Layout>
  )
}

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoading />}>
        <Switch>
          <Route path="/" exact>
            <Redirect to={'/welcome'} />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/403" exact>
            <Error403 />
          </Route>
          <Route path="/404" exact>
            <Error404 />
          </Route>
          <Route path="/500" exact>
            <Error500 />
          </Route>
          <MultiTabLayout />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router

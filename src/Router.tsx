import React, { lazy, LazyExoticComponent, Suspense, useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons'

const { Sider } = Layout
const { SubMenu } = Menu

import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom'
import { layoutRoutes } from '@/routes'
import GlobalHeaderRight from '@/components/GlobalHeaderRight'
import { Header } from 'antd/lib/layout/layout'
import { PageLoading } from '@ant-design/pro-layout'
import { useGlobalStore } from '@/hooks/useStore'
import { observer } from 'mobx-react'

const Error403 = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/Common/Error403'))
const Error404 = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/Common/Error404'))
const Error500 = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/Common/Error500'))
const Login = lazy(() => import(/* webpackChunkName: "Login" */ './pages/Common/Login'))

type PrivateRouteProps = {
  children: React.ReactNode
  path: string
  exact?: boolean
  rest?: never
}
const PrivateRoute: React.FC<PrivateRouteProps> = (
  {
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
              pathname: '/login', // eslint-disable-next-line react/prop-types
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

const LayoutRoutes = () => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsed={collapsed}
        onCollapse={() => {
        }}
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
        <Suspense fallback={<PageLoading />}>
          {layoutRoutes.map((node) => {
            const BaseComponent = node.component as React.ComponentType
            if (!node.routes) {
              return (
                <Route path={node.path} key={node.name}>
                  <BaseComponent />
                </Route>
              )
            }
            return (
              <>
                {node.routes.map((subNode) => {
                  const Component = subNode.component as LazyExoticComponent<any>
                  return (
                    <Route path={subNode.path} key={subNode.name}>
                      <BaseComponent>
                        <Component />
                      </BaseComponent>
                    </Route>
                  )
                })}
              </>
            )
          })}
        </Suspense>
      </Layout>
    </Layout>
  )
}

const Router: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<PageLoading />}>
      <Switch>
        <PrivateRoute path="/" exact>
          <Redirect to={'/welcome'} />
        </PrivateRoute>
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
        <PrivateRoute path="*">
          <LayoutRoutes />
        </PrivateRoute>
      </Switch>
    </Suspense>
  </BrowserRouter>
)

export default Router

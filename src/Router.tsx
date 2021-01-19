import React, { lazy, Suspense } from 'react'
import { Layout, Menu } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons'

const { Sider } = Layout
const { SubMenu } = Menu
// import Footer from '@/components/Footer';
// import {PageLoading} from '@ant-design/pro-layout';

import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom'
import { layoutRoutes } from '@/routes'
import GlobalHeaderRight from '@/components/GlobalHeaderRight'
import { Header } from 'antd/lib/layout/layout'
// import { useGlobalStore } from "@/hooks/useStore";

const Error403 = lazy(() =>
  import(/* webpackChunkName: "NotFound" */ './pages/Common/Error403')
)
const Error404 = lazy(() =>
  import(/* webpackChunkName: "NotFound" */ './pages/Common/Error404')
)
const Error500 = lazy(() =>
  import(/* webpackChunkName: "NotFound" */ './pages/Common/Error500')
)
const Login = lazy(() =>
  import(/* webpackChunkName: "Login" */ './pages/Common/Login')
)

type PrivateRouteProps = {
  children: React.ReactNode
  path: string
  rest?: never
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  path,
  ...rest
}: PrivateRouteProps) => {
  // const store = useGlobalStore();
  // const loggedIn = store.loginedIn;
  const loggedIn = true
  return (
    <Route
      path={path}
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

function LayoutRoutes() {
  const collapsed = false
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={false}
        onCollapse={() => {
          console.log(1)
        }}
        style={{
          width: 208,
        }}
      >
        <div className="logo" />
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
              <SubMenu
                key={node.name}
                icon={<UserOutlined />}
                title={node.name}
              >
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
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => {
                console.log()
              },
            }
          )}
          <GlobalHeaderRight />
        </Header>
        {layoutRoutes.map((node) => {
          const BaseComponent = node.component
          if (!node.routes) {
            return (
              <Route path={node.path}>
                <BaseComponent />
              </Route>
            )
          }
          return (
            <>
              {node.routes.map((subNode) => {
                const Component = subNode.component
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

        <PrivateRoute path="/private">p</PrivateRoute>
      </Layout>
    </Layout>
  )
}

const Router: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
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
        <Route path="*">
          <Switch>
            <LayoutRoutes />
            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
        </Route>
      </Switch>
    </Suspense>
  </BrowserRouter>
)

export default Router

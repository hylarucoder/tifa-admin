import React, { Suspense, useState } from "react"
import { Layout, Menu, Tabs } from "antd"
import { MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, UserOutlined } from "@ant-design/icons"

const { SubMenu } = Menu

import { BrowserRouter, Route, Redirect, Switch, Link, useHistory } from "react-router-dom"
import { flattenLayoutRoutes, layoutRoutes, RouteNode } from "@/routes"
import GlobalHeaderRight from "@/components/GlobalHeaderRight"
import { PageLoading } from "@ant-design/pro-layout"
import Login from "@/pages/Common/Login"
import Error403 from "./pages/Common/Error403"
import Error404 from "./pages/Common/Error404"
import Error500 from "./pages/Common/Error500"
import { useGlobalStore } from "@/hooks/useStore"
import { Header } from "antd/es/layout/layout"
import { observer } from "mobx-react"

const TabPage = ({ pane }: { pane: any }) => {
  const route = flattenLayoutRoutes.get(pane.url)
  // @ts-ignore
  const Component = route.component as any
  return <Component />
}

const MultiTabLayout = observer(() => {
  const store = useGlobalStore()
  const history = useHistory()
  return (
    <Suspense fallback={<PageLoading />}>
      <Tabs
        size="small"
        type="editable-card"
        onChange={(key) => {
          history.replace(key)
          store.activeTabRoute(key)
        }}
        onEdit={(key, action) => {
          if (action == "remove") {
            console.log(key, action)
            store.removeTabRoute(key)
          }
        }}
        activeKey={store.tabRouteActiveKey}
        hideAdd
      >
        {store.tabRoutes.map((pane) => (
          <Tabs.TabPane
            tab={pane.title}
            key={pane.key}
            style={{
              height: "100vh",
            }}
          >
            <TabPage pane={pane} />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </Suspense>
  )
})

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const store = useGlobalStore()
  const history = useHistory()
  const onGoTo = (node: RouteNode) => {
    history.replace(node.path)

    store.addOrActiveTabRoute({
      title: node.name,
      key: node.path,
      url: node.path,
    })
  }
  return (
    <Layout.Sider
      collapsed={collapsed}
      onCollapse={() => {}}
      style={{
        width: 208,
        background: "#FFF",
      }}
    >
      <div className="logo">CyberCity Admin</div>
      <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
        {layoutRoutes.map((node) => {
          if (!node.routes) {
            return (
              <Menu.Item key={node.path} icon={<PieChartOutlined />}>
                <a
                  onClick={() => {
                    onGoTo(node)
                  }}
                >
                  {node.name}
                </a>
              </Menu.Item>
            )
          }
          return (
            <SubMenu key={node.name} icon={<UserOutlined />} title={node.name}>
              {node.routes.map((node) => {
                return (
                  <Menu.Item key={node.path}>
                    <a
                      onClick={() => {
                        onGoTo(node)
                      }}
                    >
                      {node.name}
                    </a>
                  </Menu.Item>
                )
              })}
            </SubMenu>
          )
        })}
      </Menu>
    </Layout.Sider>
  )
}

const LayoutRoutes = () => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => {
              setCollapsed(!collapsed)
            },
          })}
          <GlobalHeaderRight />
        </Header>
        <MultiTabLayout />
      </Layout>
    </Layout>
  )
}

const Router: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<PageLoading />}>
      <Switch>
        <Route path="/" exact>
          <Redirect to={"/welcome"} />
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
        <Route path="*">
          <LayoutRoutes />
        </Route>
      </Switch>
    </Suspense>
  </BrowserRouter>
)

export default Router

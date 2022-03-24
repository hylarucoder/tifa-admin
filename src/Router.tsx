import React, { Suspense, useState } from "react"
import { Layout, Menu, Tabs } from "antd"
import { MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, UserOutlined } from "@ant-design/icons"
import { BrowserRouter, Navigate, useNavigate, useRoutes } from "react-router-dom"
import { flattenLayoutRoutes, layoutRoutes, RouteNode } from "@/routes"
import GlobalHeaderRight from "@/components/GlobalHeaderRight"
import { PageLoading } from "@ant-design/pro-layout"
import Login from "@/pages/Common/Login"
import { useGlobalStore } from "@/hooks/useStore"
import { Header } from "antd/es/layout/layout"

const { SubMenu } = Menu

const TabPage = ({ pane }: { pane: any }) => {
  const route = flattenLayoutRoutes.get(pane.url)
  // @ts-ignore
  const Component = route.component as any
  return <Component />
}

const MultiTabLayout = () => {
  const store = useGlobalStore()
  const navigate = useNavigate()
  // if (!store.loggedIn) {
  //   navigate("/login")
  // }
  return (
    <Suspense fallback={<PageLoading />}>
      <Tabs
        size="small"
        type="editable-card"
        onChange={(key) => {
          navigate(key)
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
}

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const store = useGlobalStore()
  const navigate = useNavigate()
  const onGoTo = (node: RouteNode) => {
    navigate(node.path)
    store.addOrActiveTabRoute({
      title: node.name,
      key: node.path,
      url: node.path,
    })
  }
  return (
    <Layout.Sider
      collapsed={collapsed}
      onCollapse={() => {
      }}
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

const RouterWrap: React.FC = () => {
  return useRoutes([
    // These are the same as the props you provide to <Route>
    { path: "/", element: <Navigate to={"/welcome"} /> },
    { path: "/login", element: <Login /> },
    // {
    //     path: "invoices",
    //     element: <Invoices/>,
    //     // Nested routes use a children property, which is also
    //     // the same as <Route>
    //     children: [
    //         {path: ":id", element: <Invoice/>},
    //         {path: "sent", element: <SentInvoices/>},
    //     ],
    // },
    // Not found routes work as you'd expect
    {
      path: "*",
      element: <LayoutRoutes />,
    },
  ])
}

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <RouterWrap />
    </BrowserRouter>
  )
}

export default Router

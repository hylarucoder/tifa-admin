import React, { lazy, Suspense, useState } from "react"
import { Layout, Menu, Tabs } from "antd"
import { MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, UserOutlined } from "@ant-design/icons"
import { BrowserRouter, Navigate, Outlet, Route, useNavigate, useRoutes } from "react-router-dom"
import { flattenLayoutRoutes, menuRoutes, RouteNode } from "@/routes"
import GlobalHeaderRight from "@/components/GlobalHeaderRight"
import { PageLoading } from "@ant-design/pro-layout"
import Login from "@/pages/Common/Login"
import { Header } from "antd/es/layout/layout"
import { useZStore } from "@/hooks/useZStore"
import Welcome from "@/pages/Welcome"
import { forOwn } from "lodash"

const { SubMenu } = Menu

const PageComponent = ({ component }: { component: any }) => {
  console.log("--->", component)
  if (!component) {
    return null
  }
  const Component = component as any
  return <Component />
}

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const store = useZStore()
  const navigate = useNavigate()
  const onGoTo = (node: RouteNode) => {
    navigate(node.path)
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
      <div className="logo">Tifa</div>
      <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
        {menuRoutes.map((node) => {
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

const LayoutMain: React.FC = () => {
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
        <Suspense fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
      </Layout>
    </Layout>
  )
}

const newRoutes = []
for (const menuRoute of menuRoutes) {
  if ((menuRoute.routes || []).length === 0) {
    newRoutes.push({
      path: menuRoute.path,
      element: <LayoutMain />,
      children: [
        {
          path: "",
          element: <PageComponent component={menuRoute.component} />,
        },
      ],
    })
  } else {
    const newRoute = {
      path: menuRoute.path,
      element: <LayoutMain />,
      children: (menuRoute.routes || []).map((route) => {
        return {
          path: route.path,
          element: <PageComponent component={route.component} />,
        }
      }),
    }
    newRoutes.push(newRoute)
  }
}
console.log("new", newRoutes)
const staticRoutes = [
  // These are the same as the props you provide to <Route>
  { path: "/", element: <Navigate to={"/welcome"} /> },
  { path: "/login", element: <Login /> },
  ...newRoutes,
  {
    path: "*",
    element: <div>404</div>,
  },
]
const RouterWrap: React.FC = () => {
  return useRoutes(staticRoutes)
}

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <RouterWrap />
    </BrowserRouter>
  )
}

export default Router

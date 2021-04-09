import React from "react"
import { GithubOutlined } from "@ant-design/icons"
import { DefaultFooter } from "@ant-design/pro-layout"

const Footer: React.FC = () => (
  <DefaultFooter
    copyright="CyberCity2021 基于Ant-Design-Pro V5版"
    links={[
      {
        key: "Ant Design Pro",
        title: "Ant Design Pro",
        href: "https://pro.ant.design",
        blankTarget: true,
      },
      {
        key: "github",
        title: <GithubOutlined />,
        href: "https://github.com/ant-design/ant-design-pro",
        blankTarget: true,
      },
      {
        key: "Ant Design",
        title: "Ant Design",
        href: "https://ant.design",
        blankTarget: true,
      },
    ]}
  />
)
export default Footer

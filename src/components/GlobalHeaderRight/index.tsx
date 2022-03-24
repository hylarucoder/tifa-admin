import { Space, Menu } from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons"
import React from "react"
import Avatar from "./AvatarDropdown"
import HeaderDropdown from "../HeaderDropdown"
import HeaderSearch from "../HeaderSearch"
import styles from "./index.module.less"

export const GlobalHeaderRight: React.FC = () => {
  return (
    <Space className={`${styles.right}  ${styles.light}`}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue=""
        defaultVisible={false}
        options={[
          {
            label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,
            value: "umi ui",
          },
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: "Ant Design",
          },
          {
            label: <a href="https://protable.ant.design/">Pro Table</a>,
            value: "Pro Table",
          },
          {
            label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            value: "Pro Layout",
          },
        ]}
        onSearch={(value) => {
          console.log("input", value)
        }}
      />
      <HeaderDropdown
        overlay={
          <Menu>
            <Menu.Item>
              Ant Design Pro 文档
            </Menu.Item>
          </Menu>
        }
      >
        <span className={styles.action}>
          <QuestionCircleOutlined />
        </span>
      </HeaderDropdown>
      <Avatar />
    </Space>
  )
}
export default GlobalHeaderRight

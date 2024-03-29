import React, { useCallback, useState } from "react"
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons"

import { Avatar, Menu, Spin } from "antd"
import { stringify } from "query-string"
import HeaderDropdown from "../HeaderDropdown"
import styles from "./index.module.less"
import { accountLogout } from "@/api/login"

export type GlobalHeaderRightProps = {
  menu?: boolean
}

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await accountLogout()
  const pathname = window.location.pathname
  window.location.replace("/login")
  // const { redirect } = query
  // // Note: There may be security issues, please note
  // if (window.location.pathname !== "/login" && !redirect) {
  //   window.location.replace({
  //     pathname: "/login",
  //     search: stringify({
  //       redirect: pathname,
  //     }),
  //   })
  // }
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const [initialState, setInitialState] = useState({})

  const onMenuClick = useCallback(
    (event: {
      key: React.Key
      keyPath: React.Key[]
      item: React.ReactInstance
      domEvent: React.MouseEvent<HTMLElement>
    }) => {
      const { key } = event
      if (key === "logout" && initialState) {
        setInitialState({ "1": "2" })
        // setInitialState({ ...initialState, currentUser: undefined });
        loginOut()
        return
      }
      // history.push(`/account/${key}`);
    },
    [initialState]
  )

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  )

  if (!initialState) {
    return loading
  }

  const currentUser = {
    name: "t",
    avatar: "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
  }

  if (!currentUser || !currentUser.name) {
    return loading
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  )
  return (
    // @ts-ignore
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentUser.name}</span>
      </span>
    </HeaderDropdown>
  )
}

export default AvatarDropdown

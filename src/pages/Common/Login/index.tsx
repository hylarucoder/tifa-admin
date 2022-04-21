import { LockTwoTone, MailTwoTone, MobileTwoTone, UserOutlined } from "@ant-design/icons"
import { Alert, message, Tabs } from "antd"
import React from "react"
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from "@ant-design/pro-form"
import Footer from "@/components/Footer"
import styles from "./index.module.less"
import { Link, useParams } from "react-router-dom"
import { useBoolean } from "@/hooks/useBoolean"
import { accountGetCaptcha, accountLogin } from "@/api/login"
import { useEnum } from "@/hooks/useEnum"
import { useZStore } from "@/hooks/useZStore"
import logo from "@/assets/logo.svg"

const LoginMessage: React.FC<{
  content: string
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
)

type LoginType = "username" | "mobile"

const Login: React.FC = () => {
  const usedSubmitting = useBoolean(false)
  const usedLoginType = useEnum<LoginType>("username")
  const store = useZStore()
  const params = useParams<any>()
  // const history = useHistory()

  // if (data) {
  //   store.login()
  //   if (data.login.token) {
  //     store.initialize(data.login)
  //     history.push(params.redirect || "/")
  //   } // 如果失败去设置用户错误信息
  // }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/" className={styles.banner}>
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>Tifa</span>
            </Link>
          </div>
          <div className={styles.desc}>One Full Stack Admin For Flask</div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: "登录",
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: usedSubmitting.value,
                size: "large",
                style: {
                  width: "100%",
                },
              },
            }}
            onFinish={async (values) => {
              accountLogin({
                username: values.username,
                type: "PASSWORD",
                password: values.password,
              })
            }}
          >
            {/*// @ts-ignore*/}
            <Tabs activeKey={usedLoginType.value} onChange={usedLoginType.setValue}>
              <Tabs.TabPane key="username" tab={"账户密码登录"} />
              <Tabs.TabPane key="mobile" tab={"手机号登录"} />
            </Tabs>

            {status === "error" && usedLoginType.value === "username" && (
              <LoginMessage content={"账户或密码错误（admin)"} />
            )}
            {usedLoginType.value === "username" && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: "large",
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={"用户名: admin"}
                  rules={[
                    {
                      required: true,
                      message: "用户名是必填项！",
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: "large",
                    prefix: <LockTwoTone className={styles.prefixIcon} />,
                  }}
                  placeholder={"密码: admin123"}
                  rules={[
                    {
                      required: true,
                      message: "密码是必填项！",
                    },
                  ]}
                />
              </>
            )}

            {status === "error" && usedLoginType.value === "mobile" && <LoginMessage content="验证码错误" />}
            {usedLoginType.value === "mobile" && (
              <>
                <ProFormText
                  fieldProps={{
                    size: "large",
                    prefix: <MobileTwoTone className={styles.prefixIcon} />,
                  }}
                  name="mobile"
                  placeholder={"手机号"}
                  rules={[
                    {
                      required: true,
                      message: "手机号是必填项！",
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: "不合法的手机号！",
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: "large",
                    prefix: <MailTwoTone className={styles.prefixIcon} />,
                  }}
                  captchaProps={{
                    size: "large",
                  }}
                  placeholder={"请输入验证码"}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} 获取验证码 `
                    }

                    return "获取验证码"
                  }}
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: "验证码是必填项！",
                    },
                  ]}
                  onGetCaptcha={async (mobile) => {
                    const result = await accountGetCaptcha(mobile)

                    if (result === false) {
                      return
                    }

                    message.success("获取验证码成功！验证码为：1234")
                  }}
                />
              </>
            )}
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a
                style={{
                  float: "right",
                }}
              >
                忘记密码 ?
              </a>
            </div>
          </ProForm>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login

import React, { useEffect, useState } from "react"
import { fetchRedisInfo } from "@/api/actor"
import { PageContainer } from "@ant-design/pro-layout"
import ProDescriptions from "@ant-design/pro-descriptions"
import { Card } from "antd"

const Page = () => {
  const [data, setData] = useState([])

  const initial = async () => {
    const resp = await fetchRedisInfo()
    setData(resp)
  }

  useEffect(() => {
    initial()
  }, [])
  return (
    <PageContainer>
      <Card>
        <ProDescriptions title={"Redis"} column={1}>
          {data.map((item: any) => {
            const v = JSON.stringify(item.value)
            return (
              <ProDescriptions.Item label={item.name} key={item.name}>
                {v} -- {item.desc}
              </ProDescriptions.Item>
            )
          })}
        </ProDescriptions>
      </Card>
    </PageContainer>
  )
}

export default Page

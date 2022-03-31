import { useLocation } from "react-router"
import React from "react"
import { PageContainer } from "@ant-design/pro-layout"

const Tasks = () => {
  const location = useLocation()
  return (
    <PageContainer>
      <div>Tasks</div>
      <div>{location.pathname}</div>
    </PageContainer>
  )
}

export default Tasks

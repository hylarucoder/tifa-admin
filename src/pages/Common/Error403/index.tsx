import React from 'react'
import { Button, Result } from 'antd'

export default () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => '/'}>
        Back Home
      </Button>
    }
  />
)

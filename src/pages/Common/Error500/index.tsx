import React from 'react'
import { Button, Result } from 'antd'

export default () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => '/'}>
        Back Home 500
      </Button>
    }
  />
)

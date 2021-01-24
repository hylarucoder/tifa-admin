import React from 'react'
import './BasicLayout.less'

export const BasicLayout: React.FC = ({ children }: { children?: any }) => {
  return (
    <>
      <div className="multi-tab">
        <h1>this is ulti tab</h1>
      </div>
      <div className="basic-layout">{children}</div>
    </>
  )
}
export default BasicLayout

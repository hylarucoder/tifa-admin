import React from 'react'

export const BasicLayout: React.FC = ({ children }: { children?: any }) => {
  return (
    <>
      <h1>this is ulti tab</h1>
      {children}
    </>
  )
}
export default BasicLayout

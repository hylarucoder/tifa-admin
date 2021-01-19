import React from 'react'

export const BasicLayout = ({ children }: { children?: never }) => {
  return (
    <>
      <h1>this is ulti tab</h1>
      {children}
    </>
  )
}
export default BasicLayout

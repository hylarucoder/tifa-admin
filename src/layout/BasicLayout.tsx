import React from 'react'
import style from './BasicLayout.module.less'

export const BasicLayout: React.FC = ({ children }: { children?: any }) => {
  return (
    <>
      <div className={style.multiTab}>
        <h1>this is ulti tab</h1>
      </div>
      <div className={style.basicLayout}>{children}</div>
    </>
  )
}
export default BasicLayout

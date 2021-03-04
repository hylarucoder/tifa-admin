import React, { useState } from 'react'

export const BasicLayout: React.FC = ({ children }: { children?: any }) => {
  return <div className="p-2">{children}</div>
}
export default BasicLayout

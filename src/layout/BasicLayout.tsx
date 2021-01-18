import React from "react";

export const BasicLayout = (
  {
    children
  }: { children?: any }
) => {
  return (
    <div>
      basiclayout
      <div> {children}</div>
    </div>
  )
}
export default BasicLayout;

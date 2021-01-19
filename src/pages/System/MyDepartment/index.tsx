import { useLocation } from 'react-router'
import React from 'react'

const Tasks = () => {
  const location = useLocation()
  return (
    <div>
      <div>Tasks????? 这个不应该放在这里吧？</div>
      <div>{location.pathname}</div>
    </div>
  )
}

export default Tasks

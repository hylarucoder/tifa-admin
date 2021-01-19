import { useLocation } from 'react-router'
import React from 'react'

const Tasks = () => {
  const location = useLocation()
  return (
    <div>
      <div>Tasks</div>
      <div>{location.pathname}</div>
    </div>
  )
}

export default Tasks

import { useState } from 'react'

export function useBoolean(initial = false) {
  const [value, setValue] = useState(initial)
  return {
    value,
    setTrue: () => {
      setValue(true)
    },
    setFalse: () => {
      setValue(false)
    },
    toggle: () => {
      setValue(!value)
    },
  }
}

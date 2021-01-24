import { useState } from 'react'

export function useEnum<T>(initial: T) {
  const [value, setEnumValue] = useState(initial)
  return {
    value,
    setValue: (v: T) => {
      setEnumValue(v)
    },
  }
}

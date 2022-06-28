import React, { createContext, useState, useMemo } from 'react'
import immer from 'immer'

import actions from './actions'


export const initialState = {
  difficulty: 0.1,
  updated: {},
}

export const ProgressionContext = createContext(initialState)

export default function ProgressionStoreContext({ children }) {
  const [state, setState] = useState(initialState)
  
  const immerActions = {}
  Object.keys(actions).forEach(key => {
    immerActions[key] = (...args) =>
      setState(old => immer(old, draft => actions[key](draft, ...args)))
  })

  const value = useMemo(() => [state, immerActions], [state])

  return <ProgressionContext.Provider value={value}>{children}</ProgressionContext.Provider>
}


import React, { createContext, useState, useMemo, useEffect } from 'react'
import immer from 'immer'

import actions from './actions'

export const initialState = {
    engine: null,
    appId: '13bfcc64da80416d942cae643cdd9dcd',
    token: '00613bfcc64da80416d942cae643cdd9dcdIACdWKKx/Enp1NE7VYKjJnFW7zSFO4H9IbCLtq3IroWlRS/9i54AAAAAEAD2FHLcjmOtYgEAAQCOY61i',
    channelName: 'test 1',
    openMicrophone: true,
    enableSpeakerphone: true,
    joinSucceed: false,
    peerIds: [],
}

export const AgoraContext = createContext(initialState)

export default function AgoraContextStore({ children }) {
  const [state, setState] = useState(initialState)
  
  const immerActions = {
    //   setAttribute: (...args) =>
    //     setState(old => immer(old, draft => setAttribute(draft, ...args)))
  }
  Object.keys(actions).forEach(key => {
    immerActions[key] = (...args) =>
      setState(old => immer(old, draft => actions[key](draft, ...args)))
  })

  const value = useMemo(() => [state, immerActions], [state])

  return <AgoraContext.Provider value={value}>{children}</AgoraContext.Provider>
}
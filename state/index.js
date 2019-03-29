import React, { createContext, useState, useMemo } from 'react'
import immer from 'immer'

import terms from '../terms2.json'
import actions from './actions'
import { TIME, QUESTIONS_LIMIT } from '../constants/Questions.js'

const length = terms.philosophers.length
const randomIndex = Math.round(Math.random() * length)
const randomScholarName =
  terms.philosophers[randomIndex] > 1
    ? terms.philosophers[randomIndex]
    : terms.philosophers[randomIndex + 1]

export const initialState = {
  teams: [
    {
      id: Date.now(),
      name: randomScholarName,
      points: 0,
    },
  ],
  playingTeamIndex: null,
  started: false,
  questions: [],
  questionsStatus: {},
  canStart: false,
  time: TIME,
  questionLimit: QUESTIONS_LIMIT,
}

export const Context = createContext(initialState)

export default function StoreContext({ children }) {
  const [state, setState] = useState(initialState)

  const immerActions = {}
  Object.keys(actions).forEach(key => {
    immerActions[key] = (...args) =>
      setState(old => immer(old, draft => actions[key](draft, ...args)))
  })

  const value = useMemo(() => [state, immerActions], [state])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

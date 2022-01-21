import React, { createContext, useState, useMemo, useEffect } from 'react'
import immer from 'immer'

import actions, { playWith } from './actions'
import { TIME, QUESTIONS_LIMIT, WINNING_LIMIT, GAME_TYPE } from '../constants/Questions.js'
import { initialTeam } from '../helpers/index'

import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const initialState = {
  gameType: GAME_TYPE,
  currentPlayer: null,
  matchId: null,
  teams: [initialTeam()],
  playingTeamIndex: null,
  started: false,
  questions: [],
  questionsStatus: {},
  canStart: false,
  time: TIME,
  questionLimit: QUESTIONS_LIMIT,
  winningLimit: WINNING_LIMIT,
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

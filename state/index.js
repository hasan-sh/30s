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

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(u =>{
      if (!u) return;
      console.log(u.uid)
      firestore()
        .collection('players')
        .where('id', '==', u.uid)
        .get()
        .then(c => {
          if (c.size) {
            const player = c.docs[0].data()
            player.ref = c.docs[0].ref
            console.log('Current Player Exists!')
            setState({...state, currentPlayer: player})
            return;
          }
          console.log('Current DOES NOT Player Exists!')
          firestore()
            .collection('players')
            .add({id: u.uid, name: 'Annonymous'})
            .then(ref => setState({...state, currentPlayer: {id: u.uid, ref, name: 'Annonymous'}}))
        })
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (!state.matchId && state.currentPlayer) {
      console.log('MATCH_ONLINE: subscribing for: ', state.currentPlayer.id)
      const subscriber = firestore()
        .collection('matches')
        // .doc()
        .onSnapshot(snapshot => {
            snapshot.forEach(doc => {
              if (doc.id.includes(state.currentPlayer.id)) {
                console.log('Player is in a match: ', doc.id, doc.data())
                setState({ ...state, match: doc.data(), matchId: snapshot.id })
              }
            })
        });

        return subscriber;
    }
  }, [state.currentPlayer])

  const immerActions = {}
  Object.keys(actions).forEach(key => {
    immerActions[key] = (...args) =>
      setState(old => immer(old, draft => actions[key](draft, ...args)))
  })

  const value = useMemo(() => [state, immerActions], [state])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

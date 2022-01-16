import firestore from '@react-native-firebase/firestore';
import { GAME_TYPE } from '../constants/Questions';

import {
  getQuestions,
  getIndex,
  getPlayingTeamGen,
  initialTeam,
} from '../helpers'
import terms from '../terms2'

const addTeam = (state, team) => {
  state.teams.push({ id: Date.now(), ...team })
}

const updateTeam = (state, { name, id }) => {
  const i = getIndex(state.teams, id, 'id')
  state.teams[i] = {
    points: 0,
    id: Date.now(),
    ...state.teams[i],
    name,
  }
}

const removeTeam = (state, id) => {
  const i = getIndex(state.teams, id, 'id')
  state.teams.splice(i, 1)
}

const generateQuestions = state => {
  state.questions = getQuestions(state.questionLimit)
}

const setCanStart = (state, value) => {
  state.canStart = value
}

const setPlayingTeamIndex = state => {
  const length = state.teams.length
  // const generatedIndex = getPlayingTeamGen(length).next().value
  const generatedIndex = getPlayingTeamGen(length)

  state.playingTeamIndex = generatedIndex
}

const setStarted = (state, started) => {
  state.started = started
}

const setQuestionsStatus = (state, text) => {
  const { questionsStatus, teams, playingTeamIndex } = state
  questionsStatus[playingTeamIndex] = questionsStatus[playingTeamIndex] || {}
  questionsStatus[playingTeamIndex][text] = !questionsStatus[playingTeamIndex][
    text
  ]
  const keys = Object.keys(questionsStatus[playingTeamIndex])
  const points = keys.filter(q => questionsStatus[playingTeamIndex][q]).length
  teams[playingTeamIndex].points = points
}

const setQuestionLimit = (state, limit) => {
  state.questionLimit = limit
}

const setWinningLimit = (state, limit) => {
  state.winningLimit = limit
}

const setTime = (state, time) => {
  state.time = time
}

const reset = state => {
  state.questionsStatus = {}
  state.teams = [initialTeam(terms.adjectives)]
  state.questions = []
  state.playingTeamIndex = null
  state.matchId = null
  state.gameType = GAME_TYPE
}

export const timerActions = {
  startTimer: state => {},
}

export const setGameType = (state, type) => {
  state.gameType = type;
}

export const playWith = (state, other) => {
  console.log(other, state.currentPlayer) 
  state.matchId = `${state.currentPlayer.ref.id}_${other.ref.id}`

  state.currentPlayer.ref.update({calling: other.id}).then(() => console.log('calling other.'))

  firestore()
    .doc(`matches/${state.matchId}`)
    .set({
      first: state.currentPlayer,
      second: other,
    })
    .then((d) => console.log('Created initial match.'))
}

export default {
  updateTeam,
  addTeam,
  generateQuestions,
  setCanStart,
  removeTeam,
  setPlayingTeamIndex,
  setStarted,
  setQuestionsStatus,
  setQuestionLimit,
  setWinningLimit,
  setTime,
  reset,
  setGameType,
  playWith,
}

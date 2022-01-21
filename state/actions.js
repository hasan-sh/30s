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

const updateTeam = (state, { name, id, ...team }) => {
  const i = getIndex(state.teams, id, 'id')
  state.teams[i] = {
    points: 0,
    id: Date.now(),
    ...state.teams[i],
    name,
  }
  if (team && team.ref) {
    firestore()
      .doc(`players/${team.ref.id}`)
      .update({name})
      .then(() => console.log('Online team (name) updated!'))
      .catch(e => console.error('ERROR: updating team: ', e))
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

// TODO: change the logic of getPlayingTeamGen. Put it here and use the state.
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
  // TODO: check if matchId, then delete that match.
  // Or maybe only do so, when gameType is local.
  // - user is playing online
  // - they should be able to conintue playing
  // - thus, only reset online logic, if the game type is local.
  // if (state.gameType === GAME_TYPE) {
  //   firestore()
  //     .doc(`match/${state.matchId}`)
  //     // TODO: maybe save some stats.
  //     .delete()
  //     .then(() => console.log('Match Deleted.'))
  //     .catch(e => console.log('ERORR: failed Match Deletion;', e))
  //   state.matchId = null
    state.gameType = GAME_TYPE
  // }
}

export const timerActions = {
  startTimer: state => {},
}

export const setAttribute = (state, attr, payload) => {
  console.log('setting ', attr, ' with ', payload)
  state[attr] = payload;
}

export const setGameType = (state, type) => {
  state.gameType = type;
}

export const setCurrentPlayer = (state, player) => {
  state.currentPlayer = player;
}

// TODO: fix asyncronous possible issues (i.e. await promises)
export const playWith = (state, other) => {
  console.log(other, state.currentPlayer) 
  // match setup.
  state.matchId = `${state.currentPlayer.ref.id}_${other.ref.id}`
  state.currentPlayer.ref.update({calling: other.id, currentMatch: state.matchId}).then(() => console.log('calling other.'))
  other.ref.update({currentMatch: state.matchId}).then(() => console.log('calling other.'))
  const match = {
      first: state.currentPlayer.ref,
      second: other.ref,
      status: 'waiting', // waiting, started, or finished.
  }
  firestore()
    .doc(`matches/${state.matchId}`)
    .set(match)
    .then(() => {
      // state.teams = [state.currentPlayer, other]
      // state.match = match
      console.log('Created initial match.')
    })
    .catch(e => {
      console.log("ERROR: ", e)
      reset(state)
    })
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
  setAttribute,
  setGameType,
  setCurrentPlayer,
  playWith,
}

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
}

export const timerActions = {
  startTimer: state => {},
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
}

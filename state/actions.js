import { getQuestions, getIndex, getPlayingTeamGen } from '../helpers'

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
  state.questionsStatus = {}
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

const setQuestionsStatus = (state, text) => {
  const { questionsStatus } = state
  questionsStatus[text] = !questionsStatus[text]
}

const setQuestionLimit = (state, limit) => {
  state.questionLimit = limit
}

const setTime = (state, time) => {
  state.time = time
}

const calculatePoints = state => {
  /*  */ const { questionsStatus, teams, playingTeamIndex } = state
  const howMany = Object.keys(questionsStatus).length
  teams[playingTeamIndex].points += howMany
}

const reset = state => {
  state.questionsStatus = {}
  // state.teams.forEach(team => (team.points = 0))
  state.teams = []
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
  setQuestionsStatus,
  setQuestionLimit,
  setTime,
  calculatePoints,
  reset,
}

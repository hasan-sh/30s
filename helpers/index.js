import terms from '../terms2'
import { QUESTIONS_LIMIT } from '../constants/Questions'
import { Alert } from 'react-native'

let playingTeamIndex = 0
export function getPlayingTeamGen(totalLength) {
  // while (true) {
  if (playingTeamIndex >= totalLength) {
    playingTeamIndex = 0
  }
  //   yield playingTeamIndex++
  // }
  return playingTeamIndex++
}

export function allQuestionsAnswered(status, questions, questionLimit, team) {
  return questions.every(question => status[`${team.round}_${question}`])
}

export function getIndex(arr, from, identifier) {
  return arr.findIndex(value => value[identifier] === from)
}

const getRan = n => Math.floor(Math.random() * n)

const hash = {} //used ones; to not repeat them!
export function getQuestions(limit = QUESTIONS_LIMIT) {
  const output = []
  const keys = Object.keys(terms)
  console.log(keys)

  function getChoice(arr) {
    if (output.length === limit) return output

    const len = arr ? arr.length : keys.length
    const currArr = arr ? arr : terms[keys[getRan(len)]]
    if (Array.isArray(currArr)) {
      let ranN = getRan(currArr.length)
      // This is because the first element in each array defines the difficulty of that set.
      ranN = ranN === 0 ? ranN + 1 : ranN
      if (!hash[currArr[ranN]]) {
        output.push(currArr[ranN])
        hash[currArr[ranN]] = true
      }
    } else {
      // { key: [..], key1: [..], ... }
      const keys1 = Object.keys(currArr)
      const nextArr = currArr[keys1[getRan(keys1.length)]]
      return getChoice(nextArr)
    }

    if (output.length !== limit) {
      return getChoice()
    }

    return output
  }
  return getChoice()
}

export function initialTeam(fromTerms = terms.adjectives) {
  const length = fromTerms.length
  function randomScholar() {
    const randomIndex = Math.floor(Math.random() * length)
    return randomIndex >= 1
      ? fromTerms[randomIndex]
      : fromTerms[randomIndex + 1]
  }

  const team = {
    id: Date.now() + Math.random(),
    name: randomScholar(),
    points: 0,
    round: 0,
  }
  return team
}

// TODO: make the following funtion reuasble if needed!
export function askPlayer(type, cb, name='') {
  if (type === 'chooseType') {
      const title = 'اختر نوع اللعبة';
      const message = 'أونلاين مع الأصدقاء, أو فردي للعب محليّاً';
      const buttons = [
        { text: 'محلّي (أوفلاين)', onPress: () => cb(false), },
        { text: 'مع أحد (أونلاين)', onPress: () => cb(true), }
      ];
      Alert.alert(title, message, buttons);
    }
    else if (type === 'notify') {
      const message = `"${name}" يريد أن يلعب معك!`;
      const buttons = [
        {
          text: 'قبول', onPress: () => cb(true)
        },
        {
          text: 'رفض', onPress: () => cb(false)
        }
      ];
      Alert.alert('', message, buttons);
    }
}
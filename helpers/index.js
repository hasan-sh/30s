import terms from '../terms'
import { QUESTIONS_LIMIT } from '../constants/Questions'

let playingTeamIndex = 0
export function getPlayingTeamGen(totalLength) {
  // while (true) {
  if (playingTeamIndex === totalLength) {
    playingTeamIndex = 0
  }
  //   yield playingTeamIndex++
  // }
  return playingTeamIndex++
}

export function allQuestionsAnswered(status, questionLimit) {
  const length = Object.keys(status).length
  return length === questionLimit
}

export function getIndex(arr, from, identifier) {
  return arr.findIndex(value => value[identifier] === from)
}

export function getQuestions(questionLimit) {
  let qs = []
  let used = {}
  let limit = questionLimit || QUESTIONS_LIMIT
  const keys = Object.keys(terms)
  const len = keys.length

  let counter = 0
  while (counter < limit) {
    let randomNumber = Math.floor(Math.random() * len)
    const ranArr = terms[keys[randomNumber]]
    if (Array.isArray(ranArr)) {
      let randomTermNum = Math.floor(Math.random() * ranArr.length)
      randomTermNum = randomTermNum <= 1 ? randomTermNum + 2 : randomTermNum
      if (!used[randomTermNum]) {
        qs.push({ text: ranArr[randomTermNum], checked: false })
        counter++
        continue
      }
      used[randomTermNum] = true
    } else {
      const subTerms = Object.keys(ranArr)
      const randomNumber1 = Math.floor(Math.random() * subTerms.length)
      if (!used[randomNumber + '_' + randomNumber1]) {
        const subTermArr = ranArr[subTerms[randomNumber1]]
        let randomSubTermNum = Math.floor(Math.random() * subTermArr.length)
        randomSubTermNum =
          randomSubTermNum <= 1 ? randomSubTermNum + 2 : randomSubTermNum
        qs.push({ text: subTermArr[randomSubTermNum], checked: false })
        counter++
        continue
      }
      used[randomNumber + '_' + randomNumber1] = true
    }
  }
  return qs
}

// const used = {}
// let qs = []
// const limit = 4
// const get = () => {
//   const keys = Object.keys(terms)

//   if (qs.length === limit) return qs

//   let randomNumber = Math.floor(Math.random() * keys.length)
//   const ranArr = terms[keys[randomNumber]]
//   if (Array.isArray(ranArr)) {
//     let randomTermNum = Math.floor(Math.random() * ranArr.length)
//     randomTermNum = randomTermNum <= 1 ? randomTermNum + 2 : randomTermNum
//     if (!used[randomTermNum]) {
//       qs.push(ranArr[randomTermNum])
//       used[randomTermNum] = true
//     }
//   } else {
//     // category: { arg1: [...], arg2: [...] }
//     const subTerms = Object.keys(ranArr)
//     const randomNumber = Math.floor(Math.random() * subTerms.length)
//     get()
//   }

//   if (qs.length < limit) get()

//   return qs
// }

// console.time('Test')
// console.log(`Calling it now...`)
// console.log(get())
// console.timeEnd('Test')

// console.time('Test 1')
// console.log('calling with while loop...')
// console.log(getQuestions([]))
// console.timeEnd('Test 1')

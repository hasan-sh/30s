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

const getRan = n => Math.floor(Math.random() * n);

export function getQuestions(questionLimit = QUESTIONS_LIMIT) {
    const output = [];
    const hash = {}; //used ones; to not repeat them!
    const keys = Object.keys(terms);

    function getChoice(arr) {
        if(output.length === limit) return;

        const len = arr ? arr.length : keys.length;
        const currArr = arr ? arr : terms[keys[getRan(len)]];
        if (Array.isArray(currArr)) {
            const ranN = getRan(currArr.length);
            if (!hash[currArr[ranN]]) {
                output.push(currArr[ranN]);
				        hash[currArr[ranN]] = true;
            }
        } else {
            // { key: [..], key1: [..], ... }
            const keys1 = Object.keys(currArr);
            const nextArr = currArr[keys1[getRan(keys1.length)]];
            getChoice(nextArr);
        }

        if(output.length !== limit) {
            getChoice();
        }

        return output;
    }
  return getChoice();
}

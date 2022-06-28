
import firestore from '@react-native-firebase/firestore';

const updateWord = (state, question, checked) => {
    const round_word = question.split('_')
    const round = round_word[0]
    const word = round_word[1]
    if (state.updated[word]) {
        console.log('already updated.')
        return
    }

    const incrementBy = checked ? 1 : -1
    firestore()
        .collection('words')
        .doc(round)
            .update({
                [word]: firestore.FieldValue.increment(incrementBy)
            })
            .then(v => {
                state.updated[w[1]] = true
            })
            .catch(e => {
                if (e.message.includes('[firestore/not-found]')) {
                    firestore()
                        .collection('words')
                    .doc(round)
                    .set({
                        [word]: firestore.FieldValue.increment(incrementBy)
                    })
                    .then(v => {
                        state.updated[word] = true
                    })
                    .catch(console.error)
                }
            })
        
    state.updated[word] = true
}


export default {
    updateWord,
}
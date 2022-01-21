
import React, { useEffect, useState } from 'react'
import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Context } from '.';


export default function FirebaseState() {
    const [
        { currentPlayer, matchId },
        { setAttribute, playWith, reset },
    ] = React.useContext(Context)

    const [firstTime, setFirstTime] = useState(true)

    useEffect(() => {
        console.log("FIRST TIME RUN: onCompMount", currentPlayer)
        const subscriber = auth().onAuthStateChanged(u => {
            if (!u) return;
            if (currentPlayer) return;
            console.log(u.uid)
            firestore()
                .collection('players')
                .where('id', '==', u.uid)
                .get()
                .then(c => {
                    if (c.size) {
                        const player = c.docs[0].data()
                        player.ref = c.docs[0].ref
                        console.log('Current Player Exists!', currentPlayer)
                        setAttribute('currentPlayer', player)
                        return;
                    }
                    console.log('Current DOES NOT Player Exists!')
                    firestore()
                        .collection('players')
                        .add({ id: u.uid, name: 'Annonymous' })
                        .then(ref => setAttribute('currentPlayer', { id: u.uid, ref, name: 'Annonymous' }))
                })
        });
        return () => {
            console.log("FIRST TIME RUN: Unmounting comp.")
            subscriber();
        }; // unsubscribe on unmount
    }, []);

    useEffect(() => {
        if (!matchId && currentPlayer && firstTime) {
            console.log('MATCH_ONLINE: subscribing for: ', currentPlayer.ref.id, ' ', firstTime)
            const subscriber = firestore()
                .collection('matches')
                .where('second', '==', currentPlayer.ref)
                // if so, then we should accept/decline the match.
                .onSnapshot(snapshot => {
                    snapshot.forEach(async ss => {
                        // console.log('current match ', ss.data().first.get())
                        const first = await ss.data().first.get()
                        const second = await ss.data().second.get()
                        console.log('2 current match ', ss.ref)
                        setAttribute('teams', [{...first.data(), ref: first.ref}, {...second.data(), ref: second.ref}])
                        setAttribute('match', ss.ref)
                    })
                    setFirstTime(false)
                })
                // .then(d => {
                //     d.forEach(doc => console.log(doc.data())) 
                //     console.log('mathces: ', d.docs[0].data())
                //     // console.log(d.docs[0].get('first').id)
                //     // console.log(d.docs[0].get('status'))
                //     // console.log(d.docs[0].get('second').id, typeof d.docs[0].get('second'))
                // }).catch(e => {console.error('ERROR MATCHES ', e)})
            // .doc()
            // .onSnapshot(snapshot => {
            //     snapshot.forEach(doc => {
            //       if (doc.id.includes(state.currentPlayer.ref.id)) {
            //         console.log('Player is in a match: ', doc.id, doc.data())
            //         setState({ ...state, match: doc.data(), matchId: snapshot.id })
            //       }
            //     })
            // });

            // return subscriber;
        }
    }, [currentPlayer])

    return null;
}
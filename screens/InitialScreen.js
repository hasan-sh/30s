import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, Button } from 'react-native';
import { ActivityIndicator, Colors, Divider, IconButton, List } from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';

import { Context } from '../state'
import { askPlayer } from '../helpers';
import { GAME_TYPE } from '../constants/Questions';

export default function InitialScreen({ navigation }) {
    const [
        { currentPlayer, gameType, matchId },
        { setGameType, playWith, reset },
    ] = React.useContext(Context)
    const [loading, setLoading] = useState(gameType === GAME_TYPE)
    const [players, setPlayers] = useState(null)
    console.log(gameType, loading)

    useEffect(() => setLoading(gameType === GAME_TYPE), [gameType])
    useEffect(() => {
        askPlayer('chooseType', agreed => {
            if (!agreed) {
                reset(); 
                navigation.navigate('Landing');
                return;
            }
            setGameType('online') 
            setLoading(false)
        })
    }, []);

    // TODO: maybe add the following only when gameType is online (i.e. players dont get notified)!
    useEffect(() => {
        if (currentPlayer) {
            const subscriber = firestore()
                .collection('players')
                .where('id', '!=', currentPlayer.id)
                .onSnapshot(documentSnapshot => {
                    console.log('User data: ', documentSnapshot.docs);
                    // list all other online users.
                    setPlayers(documentSnapshot.docs);
                    
                    documentSnapshot.forEach(async ss => {
                        // console.log('all players')
                        // console.log(ss.data(), currentPlayer.id)
                        if (ss.data().calling === currentPlayer.id) {
                            const incomingMatch = firestore().doc(`matches/${ss.ref.id}_${currentPlayer.ref.id}`)
                            console.log((await incomingMatch.get()).id) 
                            console.log((await incomingMatch.get()).data()) 
                            console.log(ss.ref.id,currentPlayer.ref.id)
                            askPlayer('notify', async agreed => {
                                if (!agreed) {
                                    await ss.ref.update({ calling: null })
                                    console.log('I decline others call!')
                                    await incomingMatch.delete()
                                    console.log('Match Deleted.')
                                    setLoading(false)
                                    setGameType('local')
                                    return;
                                }
                                // Current player accepted the invitation
                                // most logic is in the playWith action.
                                reset();
                                await incomingMatch.update({ status: 'started'})
                                console.log('Match Started.')
                                setGameType('online')
                                setTimeout(()=> navigation.navigate('Landing'), 2000);

                            }, ss.data().name);
                        }
                    })
                });

            return subscriber;
        }
    }, [currentPlayer]);

    // useEffect(() => {
    //     if (matchId) {
    //         console.log('MATCH_ONLINE: subscribing...', matchId.split('_'))
    //         const [id1, id2] = matchId.split('_')
    //         const subscriber = firestore()
    //         .doc(`matches/${matchId}`)
    //         .onSnapshot(snapshot => {
    //             const data = snapshot.data()
    //             console.log(data, snapshot.id)
    //             if (!data) return;
    //         });

    //         return subscriber;
    //     }
    // }, [matchId])



    return (
        <>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            {loading && <ActivityIndicator animating={true} color={Colors.blue700} />}
            {gameType === 'online' && players && (
                    players.map((ss, i) => {
                        const doc = ss.data()
                        doc.ref = ss.ref
                        return <View key={i}>
                            <List.Item
                                // key={i}
                                onPress={() => {
                                    console.log('calling list')
                                    alert(`calling ${doc.name}`)
                                    setLoading(true)
                                    playWith(doc)
                                }}
                                title={doc.name}
                                // description="Item description" // TODO: add whether they're online or not!
                                left={props => <List.Icon {...props} icon="phone" />}
                            />
                            <Divider  style={{ color: 'black', height: 2, width: '100%' }} />
                        </View>
                    })
            )}
        </ScrollView>
          <Button
            title="العب على الجهاز (محلّي)"
            icon="account"
            mode="contained"
            theme={{ roundness: 0 }}
            onPress={() => {
                reset()
                navigation.navigate('Landing')
            }}
            style={{
              alignSelf: 'stretch',
              marginTop: 5,
              padding: 5,
            }}
          />
        </>
    )
}

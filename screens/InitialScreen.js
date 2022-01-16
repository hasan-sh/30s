import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { ActivityIndicator, Colors, IconButton, List } from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';

import { Context } from '../state'
import { askPlayer } from '../helpers';

export default function InitialScreen({ navigation }) {
    const [
        { currentPlayer, gameType, matchId },
        { setGameType, playWith, reset },
    ] = React.useContext(Context)
    const [loading, setLoading] = useState(true)
    const [players, setPlayers] = useState(null)
    console.log(gameType)

    useEffect(() => {
        askPlayer('chooseType', agreed => {
            if (!agreed) {
                reset(); 
                navigation.navigate('Landing');
                return;
            }
            setGameType('online') 
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
                    setPlayers(documentSnapshot.docs);
                    setLoading(false)
                    
                    documentSnapshot.forEach(ss => {
                        console.log('all players')
                        console.log(ss.data(), currentPlayer.id)
                        if (ss.data().calling === currentPlayer.id) {
                            askPlayer('notify', agreed => {
                                if (!agreed) {
                                    ss.ref.update({ calling: null }).then(() => console.log('I decline others call!'));
                                    setGameType('local')
                                    return;
                                }
                                reset();
                                setGameType('online')
                                navigation.navigate('Landing');

                            }, ss.data().name);
                        }
                    })
                });

            return subscriber;
        }
    }, [currentPlayer]);

    useEffect(() => {
        if (matchId) {
            console.log('MATCH_ONLINE: subscribing...', matchId.split('_'))
            const [id1, id2] = matchId.split('_')
            const subscriber = firestore()
            .doc(`matches/${matchId}`)
            .onSnapshot(snapshot => {
                const data = snapshot.data()
                console.log(data, snapshot.id)
                if (!data) return;
            });

            return subscriber;
        }
    }, [matchId])



    return (
        // <ScrollView contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
        <>
            {loading && <ActivityIndicator animating={true} color={Colors.blue700} />}
            {players && (
                players.map((ss, i) => {
                    const doc = ss.data()
                    doc.ref = ss.ref
                    return <List.Item
                        key={i}
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
                })
            )}
        </>
        // </ScrollView>
    )
}

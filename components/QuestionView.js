import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from 'react-native';
import { Divider, Button, IconButton } from 'react-native-paper';
import { playSound } from '../helpers/sound';

const QuestionsView = (props) => {
  const { colors } = useTheme()
  const [clickedAfterCompletion, setClickedAfterCompletion] = useState([])
    
    return (
    <View style={{ flex: 1 }}>
        {props.questions.map((question, i) => {
            prop = `${props.team.round}_${question}`  
            return (
            <View style={{ flex: 1 }} key={i}>
                    <Divider style={{ color: colors.border, height: 2 }} />
                <TouchableWithoutFeedback
                    onPress={() => {
                        if (props.show) {
                            props.setCheck(question)
                            if (props.played) {
                                playSound({name: 'wrongbuzz', type: 'wav'})
                                setClickedAfterCompletion(arr => [...arr, question])
                            } 

                        }
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {props.show ? (
                            <React.Fragment>
                                {props.questionsStatus[props.playingTeamIndex] && props.questionsStatus[props.playingTeamIndex][prop] && (
                                    <Button icon="check" color={clickedAfterCompletion.includes(question) && 'green'} />
                                )}
                                {clickedAfterCompletion.includes(question) ? 
                                    <Text style={{color: 'green'}}>{question}</Text> : 
                                    <Text style={{color: props.questionsStatus[props.playingTeamIndex] && props.questionsStatus[props.playingTeamIndex][prop] ? colors.primary: colors.text}}>{question}</Text>}
                                
                            </React.Fragment>
                        ) : (
                            <Text style={{color: colors.text}}>...</Text>
                        )}
                    </View>
                </TouchableWithoutFeedback>
                {/* {props.questions.length !== i && ( */}
                {/* )} */}
            </View>
        )
    }
        )}
    </View>
)}


export default QuestionsView;

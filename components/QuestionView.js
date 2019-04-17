import React from 'react';
import {
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from 'react-native';
import { Divider, Button } from 'react-native-paper';

const QuestionsView = (props) => (
    <View style={{ flex: 1 }}>
        {props.questions.map((question, i) => (
            <View style={{ flex: 1 }} key={i}>
                <TouchableWithoutFeedback
                    onPress={() => props.show && props.setCheck(question)}
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
                                {props.questionsStatus[props.playingTeamIndex] && props.questionsStatus[props.playingTeamIndex][question] && (
                                    <Button icon="done" />
                                )}
                                <Text style={{color: props.questionsStatus[props.playingTeamIndex] && props.questionsStatus[props.playingTeamIndex][question] ? 'blue' : 'black'}}>{question}</Text>
                            </React.Fragment>
                        ) : (
                            <Text>...</Text>
                        )}
                    </View>
                </TouchableWithoutFeedback>
                {props.questions.length !== i && (
                    <Divider style={{ color: 'black', height: 2 }} />
                )}
            </View>
        ))}
    </View>
);

export default QuestionsView;

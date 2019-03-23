import React from 'react'
import { Text, View } from 'react-native'
import { Checkbox, Divider } from 'react-native-paper'

const QuestionsView = props => (
  <View style={{ flex: 1 }}>
    {props.questions.map((question, i) => (
      <View style={{ flex: 1 }} key={i}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {props.show ? (
            <View>
              <Checkbox
                status={
                  props.questionsStatus[question.text] ? 'checked' : 'unchecked'
                }
                onPress={() => {
                  props.setCheck(question.text)
                }}
                disabled={props.played}
                background={{ type: 'RippleAndroid' }}
              />
              <Text>{question.text}</Text>
            </View>
          ) : (
            <Text>...</Text>
          )}
        </View>
        {props.questions.length !== i && (
          <Divider style={{ color: 'black', height: 2 }} />
        )}
      </View>
    ))}
  </View>
)

export default QuestionsView

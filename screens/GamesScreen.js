import React, { useEffect, useState } from 'react'

import { ScrollView, StyleSheet, Text, View, Vibration } from 'react-native'
import { Button, Subheading } from 'react-native-paper'

import Colors from '../constants/Colors'
import { Context } from '../state'
import QuestionsView from '../components/QuestionView'
import Timer from '../components/Timer'
import { allQuestionsAnswered } from '../helpers'
import { VIBRATE_DURATION_PATTERN } from '../constants/Questions'
import DisableBackButton from '../components/DisableBackButton';

const DEFAULT_ERROR_MESSAGE = ' لايوجد أسئلة في الوقت الحالي, هل لديك فريق؟'

function GamesScreen(props) {
  const [
    {
      questions,
      questionsStatus,
      questionLimit,
      time,
      teams,
      playingTeamIndex,
      winningLimit,
      canStart,
    },
    { generateQuestions, setQuestionsStatus, setStarted, reset },
  ] = React.useContext(Context)
  const [errorMessage, setErrorMessage] = useState()
  const [startTimer, setStartTimer] = useState()
  const [ready, setReady] = useState(false)
  const [played, setPlayed] = useState(false)
  const [count, setCount] = useState(time);

  useEffect(() => {
    if (played) {
      setPlayed(false)
      setCount(time)
    }
  }, [questions])

  useEffect(() => {
    if (canStart) {
      setErrorMessage(null)
    } else if (!teams.length) {
      setErrorMessage('رجاء إضافة فرق ومن ثم البدء')
    } else {
      setErrorMessage(DEFAULT_ERROR_MESSAGE)
    }
    if (canStart && !questions.length) {
      generateQuestions()
    }
  }, [canStart])

  useEffect(() => {
    if (startTimer && questionsStatus[playingTeamIndex] && allQuestionsAnswered(questionsStatus[playingTeamIndex], questionLimit)) {
      done()
    }
  }, [questionsStatus])

  useEffect(() => {
    if (count === 0) {
      Vibration.vibrate(VIBRATE_DURATION_PATTERN)
    }
  }, [count])

  function done() {
    setStartTimer(false)
    setPlayed(true)
  }
  const winner = teams.find(team => team.points >= winningLimit)
  if (winner) {
    // setStarted(false)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{winner.name} الفائز</Text>
        <Button
          icon="arrow-back"
          mode="contained"
          theme={{ roundness: 0 }}
          onPress={() => {
            reset()
            props.navigation.pop()
          }}
          style={{
            alignSelf: 'stretch',
            marginTop: 5,
          }}
        >
          الفرق
        </Button>
        <Button
          icon="arrow-forward"
          mode="contained"
          color={Colors.submit}
          theme={{ roundness: 0 }}
          onPress={() => {
            props.navigation.navigate('Status')
          }}
          style={{
            alignSelf: 'stretch',
            marginTop: 5,
            padding: 5,
          }}
        >
          نتائج
        </Button>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <DisableBackButton disable={startTimer} />
      <ScrollView contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
        {canStart && playingTeamIndex !== null && !played && (
          <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
            <Subheading style={{ fontSize: 22 }}>
              <Text style={{ color: 'gray' }}>فريق:</Text>{' '}
              {teams[playingTeamIndex].name}
            </Subheading>
            {!startTimer && !played && (
              <Button
                mode="contained"
                theme={{ roundness: 5 }}
                onPress={() => {
                  if (ready) {
                    setStartTimer(true)
                    setStarted(true)
                  } else {
                    setReady(true)
                  }
                }}
                style={{
                  width: '50%',
                  marginTop: 5,
                }}
              >
                {ready ? 'إبدأ' : 'جاهز'}
              </Button>
            )}
          </View>
        )}

        {startTimer && (
          <Timer
            setCount={(newCount) => {
              if (count === 0) return done();
              setCount(newCount);
            }}
            time={time}
          />
        )}
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: count < 5 ? 'red' : 'blue' }}>
            {played
              ? `
            الوقت النهائي ${count} ثانية
            `
              : `
            الوقت ${count} ثانية
            `}
          </Text>
        </View>

        <QuestionsView
          questions={questions}
          questionsStatus={questionsStatus}
          show={startTimer || played}
          played={played}
          setCheck={setQuestionsStatus}
          playingTeamIndex={playingTeamIndex}
        />

        {errorMessage && (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text
              style={{
                backgroundColor: Colors.noticeBackground,
                padding: 50,
                color: 'white',
              }}
            >
              {errorMessage}
            </Text>
          </View>
        )}
      </ScrollView>
      <View>
        <Button
          icon="arrow-back"
          mode="contained"
          theme={{ roundness: 0 }}
          disabled={played || startTimer}
          onPress={() => {
            props.navigation.pop()
          }}
          style={{
            alignSelf: 'stretch',
          }}
        >
          رجوع
        </Button>
        <Button
          icon="arrow-forward"
          mode="contained"
          color={Colors.submit}
          theme={{ roundness: 0 }}
          disabled={!played || startTimer}
          onPress={() => {
            props.navigation.navigate('Status')
          }}
          style={{
            alignSelf: 'stretch',
            marginTop: 5,
            padding: 5,
          }}
        >
          نتائج
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    height: '100%',
    backgroundColor: '#fff',
  },
})

GamesScreen.propTypes = {}
export default GamesScreen

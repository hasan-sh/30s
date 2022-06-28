import React, { useEffect, useState } from 'react'

import { ScrollView, StyleSheet, Text, View, Vibration } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Button, IconButton, Subheading } from 'react-native-paper'

import Colors from '../constants/Colors'
import { Context } from '../state'
import QuestionsView from '../components/QuestionView'
import Timer from '../components/Timer'
import { allQuestionsAnswered, askPlayer } from '../helpers'
import { GAME_TYPE, VIBRATE_DURATION_PATTERN } from '../constants/Questions'
import DisableBackButton from '../components/DisableBackButton';
import { InterstitialAdView } from '../components/AdView'
import { playSound } from '../helpers/sound'
import FocusAwareStatusBar from '../components/FocusedStatusBar'
import { ProgressionContext } from '../state/progression/progression'

const DEFAULT_ERROR_MESSAGE = ' لايوجد أسئلة في الوقت الحالي, هل لديك فريق؟'

function GamesScreen(props) {
  const { colors } = useTheme()
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
      gameType,
      currentPlayer,
    },
    { generateQuestions, setQuestionsStatus, setStarted, reset, },
  ] = React.useContext(Context)
  const [
    {},
    { updateWord },
  ] = React.useContext(ProgressionContext)

  const [errorMessage, setErrorMessage] = useState()
  const [startTimer, setStartTimer] = useState()
  const [played, setPlayed] = useState(false)
  const [count, setCount] = useState(time);

  // console.log(teams[playingTeamIndex])
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
    if (startTimer && questionsStatus[playingTeamIndex] && allQuestionsAnswered(questionsStatus[playingTeamIndex], questions, questionLimit, teams[playingTeamIndex])) {
      // done()
      setPlayed(true)
      playSound({}, true) // pause if all questions are checked
    }
  }, [questionsStatus])

  useEffect(() => {
    if (count === 2) {
      playSound({name: 'countdown', type: 'wav'}, played)
    }
    if (count === 0) {
      done();
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
    playSound({name: 'win', type: 'wav'})
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor={Colors.main} />
        <Text><Text style={{fontSize: 28, color: colors.text}}>{winner.name}</Text> الفائز</Text>
        <Button
          icon={() => <IconButton
            icon={{ source: 'arrow-right', direction: 'rtl' }}
            style={{ padding: 0, margin: 0}}
            color='white'
          />}
          mode="contained"
          theme={{ roundness: 0 }}
          onPress={() => {
            // TODO: create a separate action gameWon(team) and reset from there.
            // + do firebase needed logic.
            // playSound({}, true)
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
          icon={() => <IconButton
            icon={{ source: 'arrow-left', direction: 'rtl' }}
            style={{ padding: 0, margin: 0}}
            color='white'
          />}
          mode="contained"
          color={colors.notification}
          theme={{ roundness: 0 }}
          onPress={() => {
            // playSound({}, true)
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
        <InterstitialAdView type="image" media={false} />
      </View>
    )
  }

  return (
    <View style={{...styles.container, backgroundColor: colors.background,}}>
      <DisableBackButton disable={true} />
      <ScrollView contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
        {/* {canStart && playingTeamIndex !== null && !played && (
          <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
            <Subheading style={{ fontSize: 22 }}>
              <Text style={{ color: 'gray' }}>فريق:</Text>{' '}
              {teams[playingTeamIndex].name}
            </Subheading>
          </View>
        )} */}

        {startTimer && (
          <Timer
            setCount={(newCount) => {
              // if (count < 1) return done();
              setCount(newCount);
            }}
            time={time}
          />
        )}
        {!errorMessage && (
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 45, }}>
            <Text style={{ color: count < 6 || played ? 'red' : colors.primary, fontSize: 20, }}>
              {!startTimer && played
                ? `
              الوقت النهائي ${count} ثانية
              `
                : `
              ${count} ثانية
              `}
            </Text>
          </View>
        )}

        <QuestionsView
          questions={questions}
          questionsStatus={questionsStatus}
          show={(startTimer || played) && (gameType === GAME_TYPE ? true : currentPlayer.playing)}
          played={!startTimer && played}
          setCheck={(question, roundQuestion, checked) => { 
            updateWord(roundQuestion, checked)
            setQuestionsStatus(question)
          }}
          canCheck={gameType === GAME_TYPE ? true : currentPlayer.playing}
          playingTeamIndex={playingTeamIndex}
          team={teams[playingTeamIndex]}
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
        {played && startTimer ? (
          <Button
            icon="stop-circle-outline"
            mode="contained"
            theme={{ roundness: 0 }}
            color={colors.notification}
            onPress={done}
            style={{
              alignSelf: 'stretch',
            }}
          >
            إنهاء الجولة
          </Button>
        ) : (
          <Button
            icon="stop-circle-outline"
            mode="contained"
            theme={{ roundness: 0 }}
            // color={Colors.warningBackground}
            color={colors.notification}
            disabled={played || startTimer}
            onPress={() => {
              askPlayer('', agreed => {
                if (agreed){
                  reset()
                  props.navigation.pop()
                }
              })
            }}
            style={{
              alignSelf: 'stretch',
            }}
          >
            إنهاء اللعبة
          </Button>
        )}

        {!startTimer && !played ? (
          <Button
            icon="arrow-right-drop-circle-outline"
            mode="contained"
            theme={{ roundness: 0 }}
            color={colors.primary}
            onPress={() => {
                setStartTimer(true)
                setStarted(true)
            }}
            style={{
              alignSelf: 'stretch',
              marginTop: 5,
              padding: 5,
            }}
          >
            إبدأ
          </Button>
        ) : (
        <Button
          icon={() => <IconButton
            icon={{ source: 'arrow-right', direction: 'rtl' }}
            style={{ padding: 0, margin: 0}}
            color='white'
          />}
          mode="contained"
          color={colors.primary}
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
        )}
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

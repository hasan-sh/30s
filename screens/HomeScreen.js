import React, { useState, useEffect } from 'react'

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native'

// import IntroImageSrc from '../assets/images/intro.jpg'

import { List, Button, Title } from 'react-native-paper'

import TeamListItem from '../components/TeamListItem'
import { Context } from '../state'
import Colors from '../constants/Colors'

function HomeScreen(props) {
  const [
    { teams, canStart, playingTeamIndex },
    { addTeam, updateTeam, setCanStart, setPlayingTeamIndex, removeTeam },
  ] = React.useContext(Context)

  const [addingDisabled, setAddingDisabled] = useState(false)
  const [error, setError] = useState()
  const [showButton, setShowButton] = useState(true)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setShowButton(false)
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setShowButton(true)
    )
    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  useEffect(() => {
    if (error) {
      const handle = setTimeout(setError, 2000)
      return () => clearTimeout(handle)
    }
  }, [error])

  useEffect(() => {
    if (teams.length < 2 && canStart) {
      setCanStart(false)
    } else if (teams.length >= 2 && !canStart) {
      setCanStart(true)
    }
    if (teams.length && playingTeamIndex === null) {
      // To start with the first team!
      setPlayingTeamIndex()
    }
  }, [teams])

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        {/* <Image source={IntroImageSrc} style={styles.welcomeImage} /> */}
        <Title style={styles.getStartedText}>
          أهلاً بك في لعبة ٣٠ ثانية, هنا ستختبر ذكائك بطريقة ممتعة!
        </Title>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <List.Section title="الفرق" style={styles.teamList}>
          <Text style={{ color: 'red', alignSelf: 'flex-end' }}>{error}</Text>

          <KeyboardAvoidingView
            // style={{ flex: 1 }}
            contentContainerStyle={styles.contentContainer}
            keyboardVerticalOffset={5}
            behavior="padding"
          >
            {teams.map((team, i) => (
              <TeamListItem
                key={team.id}
                id={team.id}
                i={i}
                name={team.name}
                updateTeam={({ name, id }) => {
                  const exists = teams.some(team => team.name === name)
                  setAddingDisabled(false)
                  if (!name) {
                    setError('!الإسم لايمكن أن يكون فارغ, أضف اسمً آخر')
                    return removeTeam(id)
                  }
                  if (exists) return setError('هذا الإسم مستخدم مسبقاً!')
                  updateTeam({ name, id })
                }}
                removeTeam={id => {
                  setAddingDisabled(false)
                  removeTeam(id)
                }}
              />
            ))}
          </KeyboardAvoidingView>
          <Button
            icon="add-circle"
            mode="contained"
            disabled={addingDisabled}
            onPress={() => {
              addTeam({})
              setAddingDisabled(true)
            }}
          >
            فريق جديد
          </Button>
        </List.Section>
      </ScrollView>
      {showButton && (
        <React.Fragment>
          <Button
            icon="build"
            mode="contained"
            theme={{ roundness: 0 }}
            onPress={() => {
              props.navigation.navigate('Settings')
            }}
            style={{
              alignSelf: 'stretch',
            }}
          >
            الإعدادات
          </Button>
          <Button
            icon="arrow-forward"
            mode="contained"
            color={Colors.submit}
            theme={{ roundness: 0 }}
            disabled={addingDisabled || !canStart}
            onPress={() => {
              props.navigation.push('Game')
            }}
            style={{
              alignSelf: 'stretch',
              marginTop: 5,
              padding: 5,
            }}
          >
            إبدأ اللعبة
          </Button>
        </React.Fragment>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 40,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    // paddingTop: 150,
    // alignItems: 'center',
    // justifyContent: 'space-between',
    flex: 1,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  teamList: {
    width: '90%',
    flex: 1,
    flexGrow: 2,
  },
  getStartedText: {
    fontSize: 22,
    color: 'rgba(96,100,109, 1)',
    width: '90%',
    lineHeight: 24,
    textAlign: 'center',
  },
})

HomeScreen.propTypes = {}
export default HomeScreen

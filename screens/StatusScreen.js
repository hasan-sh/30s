import React from 'react'

import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { Button, DataTable, Title } from 'react-native-paper'

import { Context } from '../state'
import Colors from '../constants/Colors'
import { BannerAdView } from '../components/AdView'

function StatusScreen(props) {
  const [
    { teams, playingTeamIndex, canStart, winningLimit },
    { generateQuestions, setPlayingTeamIndex, setRound },
  ] = React.useContext(Context)

  // Should go back to previous screen!
  if (!canStart) props.navigation.pop()
  const winner = teams.find(team => team.points >= winningLimit)
  const sortedTeams = teams.map(t => t).sort((a, b) => b.points - a.points)
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
        <BannerAdView type="image" media={false} />
        {/* {!winner && (
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <Text style={{ color: 'gray' }}> :الفريق التالي</Text>
            <Title>
              {teams[playingTeamIndex + 1]
                ? teams[playingTeamIndex + 1].name
                : teams[0].name}
            </Title>
          </View>
        )} */}
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>فريق</DataTable.Title>
            <DataTable.Title numeric>نقاط</DataTable.Title>
          </DataTable.Header>

          {sortedTeams.map((team, i) => (
            <DataTable.Row
              key={i}
              style={{
                backgroundColor: i === playingTeamIndex ? 'lightblue' : 'white',
              }}
            >
              <DataTable.Cell>{team.name}</DataTable.Cell>
              <DataTable.Cell numeric>{team.points || 0}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'stretch',
          }}
        />
      </ScrollView>
      <Button
        icon="arrow-left"
        mode="contained"
        theme={{ roundness: 0 }}
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
        mode="contained"
        color={Colors.submit}
        theme={{
          roundness: 0,
        }}
        disabled={!!winner}
        onPress={() => {
          setRound()
          setPlayingTeamIndex()
          generateQuestions()
          props.navigation.navigate('Game')
        }}
        style={{
          alignSelf: 'stretch',
          marginTop: 5,
          padding: 5,
        }}
      >
        التالي <Text style={{fontWeight: 'bold', fontSize: 16}}>{teams[playingTeamIndex + 1]
                ? teams[playingTeamIndex + 1].name
                : teams[0].name}</Text>
      </Button>
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

StatusScreen.propTypes = {}
export default StatusScreen

import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { Picker } from '@react-native-community/picker'
import { Divider } from 'react-native-paper'
import { Context } from '../state'
import { InterstitialAdView } from '../components/AdView'

const SettingsScreen = () => {
  const [
    { time, questionLimit, winningLimit },
    { setTime, setQuestionLimit, setWinningLimit },
  ] = useContext(Context);

  return (
    <View
      style={{
        padding: 10,
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <InterstitialAdView type="image" media={false} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ flexGrow: 1 }}>وقت الإجابة</Text>
        <Picker
          selectedValue={time}
          style={{ height: 50, width: 200 }}
          onValueChange={itemValue => setTime(itemValue)}
        >
          <Picker.Item label="30 ثانية" value={30} />
          <Picker.Item label="40 ثانية" value={40} />
          <Picker.Item label="60 ثانية" value={60} />
        </Picker>
      </View>

      <Divider style={{ color: 'black', height: 2, width: '100%' }} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ flexGrow: 1 }}>عدد الخيارات(الأسئلة)</Text>
        <Picker
          selectedValue={questionLimit}
          style={{ height: 50, width: 200 }}
          onValueChange={itemValue => setQuestionLimit(itemValue)}
        >
          <Picker.Item label="4 خيارات" value={4} />
          <Picker.Item label="5 خيارات" value={5} />
          <Picker.Item label="6 خيارات" value={6} />
        </Picker>
      </View>
      <Divider style={{ color: 'black', height: 2, width: '100%' }} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ flexGrow: 1 }}>حدْ الربح</Text>
        <Picker
          selectedValue={winningLimit}
          style={{ height: 50, width: 200 }}
          onValueChange={itemValue => setWinningLimit(itemValue)}
        >
          <Picker.Item label="5 نقاط" value={5} />
          <Picker.Item label="8 نقاط" value={8} />
          <Picker.Item label="15 نقطة" value={15} />
          <Picker.Item label="25 نقطة" value={25} />
        </Picker>
      </View>
    </View>
  )
}

export default SettingsScreen

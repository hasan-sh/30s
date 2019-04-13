import React, { useEffect } from 'react'
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  I18nManager,
} from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'

import AppNavigator from './navigation/AppNavigator'
import StoreContext from './state'

function forceRTL() {
  try {
    I18nManager.forceRTL(true)
  } catch (e) {
    console.log(e)
  }
}

const App = () => {
  useEffect(() => {
    forceRTL()
  }, [])

  return (
    <StoreContext>
      {/* <TimerStoreContext> */}
      <PaperProvider>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </PaperProvider>
      {/* </TimerStoreContext> */}
    </StoreContext>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

import React from 'react'
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import { Provider as PaperProvider, Title } from 'react-native-paper'

import AppNavigator from './navigation/AppNavigator'
import StoreContext from './state'
import AgoraContextStore from './state/agora'
import FirebaseState from './state/firebase'

const App = () => (
  <StoreContext>
    <AgoraContextStore>
      <FirebaseState />
      {/* <AgoraModule /> */}
      <PaperProvider>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </PaperProvider>

    </AgoraContextStore>
  </StoreContext>
);

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

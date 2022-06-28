import React from 'react'
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import { Provider as PaperProvider, Title } from 'react-native-paper'

import { useColorScheme } from 'react-native';


import FocusAwareStatusBar from './components/FocusedStatusBar'

import AppNavigator from './navigation/AppNavigator'
import StoreContext from './state'
import FirebaseState from './state/firebase'
import { CombinedDarkTheme, CombinedDefaultTheme } from './constants/Theme';
import ProgressionStoreContext from './state/progression/progression';

const App = () => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <StoreContext >
      <ProgressionStoreContext >
        {/* <FirebaseState /> */}
        <PaperProvider theme={theme}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <FocusAwareStatusBar barStyle="default" />}
            <AppNavigator theme={theme} />
          </View>
        </PaperProvider>
      </ProgressionStoreContext >
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

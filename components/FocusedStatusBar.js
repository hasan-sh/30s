import * as React from 'react';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  console.log('sit focuse', isFocused)
  return isFocused ? <StatusBar {...props} /> : null;
}

export default FocusAwareStatusBar
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';

import App from './App';
import {name as appName} from './app.json';

import {AdManager} from 'react-native-admob-native-ads';

AdManager.setRequestConfiguration({
  tagForChildDirectedTreatment: false,
});

const NATIVE_AD_ID = 'ca-app-pub-9014543169045134/6643424698';

const NATIVE_AD_VIDEO_ID =
  Platform.OS === 'ios'
    ? 'ca-app-pub-3940256099942544/2521693316'
    : 'ca-app-pub-3940256099942544/1044960115';

// // image test ad
// AdManager.registerRepository({
//   name: 'imageAd',
//   adUnitId: NATIVE_AD_ID,
//   numOfAds: 3,
//   nonPersonalizedAdsOnly: false,
//   videoOptions:{
//     mute: false
//   },
//   expirationPeriod: 3600000, // in milliseconds (optional)
//   mediationEnabled: false,
// }).then(result => {
//   console.log('registered: ', result);
// });


AppRegistry.registerComponent(appName, () => App);

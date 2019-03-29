import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'

import HomeScreen from '../screens/HomeScreen'
import GamesScreen from '../screens/GamesScreen'
import StatusScreen from '../screens/StatusScreen'
import SettingsScreen from '../screens/SettingsScreen'
import AboutScreen from '../screens/AboutScreen';

import Colors from '../constants/Colors'

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen, navigationOptions: {
      header: null,
    } },
    About: {
      screen: AboutScreen,
      navigationOptions: {
        title: 'عن اللعبة',
      }
    },
  },
  {
    // headerMode: 'none',
  }
)

HomeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
}

const GameStack = createStackNavigator(
  {
    Game: {
      screen: GamesScreen,
      navigationOptions: {
        title: '٣‬٠‬ ثانية',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="games" />
        ),
        
        headerTintColor: Colors.tintColor,
        headerStyle: {
          backgroundColor: Colors.tabBar,
        },
      },
    },
    Status: {
      screen: StatusScreen,
      navigationOptions: {
        title: 'النتائج',
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'الإعدادات',
      },
    },
  },
  {
    headerLayoutPreset: 'center',
  }
)

GameStack.navigationOptions = {
  tabBarLabel: 'Game',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="games" />,
}

export default createStackNavigator(
  {
    Home: HomeStack,
    Game: GameStack,
  },
  {
    initialRouteName: 'Home',
    headerBackTitleVisible: true,
    tabBarOptions: {
      // showLabel: false,
    },
    headerMode: 'none',
  }
)

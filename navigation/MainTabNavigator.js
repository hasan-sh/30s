import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation-stack'
 
import TabBarIcon from '../components/TabBarIcon'

import InitialScreen from '../screens/InitialScreen'
import HomeScreen from '../screens/HomeScreen'
import GamesScreen from '../screens/GamesScreen'
import StatusScreen from '../screens/StatusScreen'
import SettingsScreen from '../screens/SettingsScreen'
import AboutScreen from '../screens/AboutScreen';

import Colors from '../constants/Colors'

const HomeStack = createStackNavigator(
  {
    Initial: {
      screen: InitialScreen, 
      navigationOptions: {
        headerTitleAlign:'center',
        title: 'شاشة البدء'
      }
    },
    Landing: { screen: HomeScreen, navigationOptions: {
      headerShown: false,
    } },
    About: {
      screen: AboutScreen,
      navigationOptions: {
        title: 'عن اللعبة',
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'الإعدادات',
      },
    },
  },
  {
    initialRouteName: 'Initial',
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
        headerTitleAlign: 'center',
        headerTintColor: Colors.tintColor,
        headerStyle: {
          backgroundColor: Colors.tabBar,
        },
        headerLeft: () => <></> 
      },
    },
    Status: {
      screen: StatusScreen,
      navigationOptions: {
        title: 'النتائج',
        headerTitleAlign: 'center',
      },
    },
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
    tabBarOptions: {
      // showLabel: false,
    },
    navigationOptions: {
      headerBackTitleVisible: true,
    },
    headerMode: 'none',
  }
)

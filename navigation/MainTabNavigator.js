import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'


import TabBarIcon from '../components/TabBarIcon'

import InitialScreen from '../screens/InitialScreen'
import HomeScreen from '../screens/HomeScreen'
import GamesScreen from '../screens/GamesScreen'
import StatusScreen from '../screens/StatusScreen'
import SettingsScreen from '../screens/SettingsScreen'
import AboutScreen from '../screens/AboutScreen';

import Colors from '../constants/Colors'

const Stack = createStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{ gestureEnabled: true }}
      // screenListeners={{focus: focused => {}}}
    >
      <Stack.Group>
        <Stack.Screen
          name="Landing"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Initial"
          component={InitialScreen}
          options={{headerTitleAlign: 'center', title: 'شاشة البدء'}}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: 'عن اللعبة',}}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'الإعدادات',}}
        />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen
          name="Game"
          component={GamesScreen}
          options={({ route }) => ({
            title: (route.params && route.params.title) || '٣‬٠‬ ثانية',
            // headerStyle: { backgroundColor: Colors.main },
            headerTitleAlign: 'center',
            headerLeft: () => <></>,
            // headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })
        }
          // listeners={{
          //   focus: (focused) => <TabBarIcon focused={focused} name="games" />
          // }}
          // options={{headerShown: false}}
          // options={{ 
          //   headerTitleAlign: 'center', 
          //   title: '٣‬٠‬ ثانية',
          //   headerTintColor: Colors.tintColor,
          //   headerStyle: {
          //     backgroundColor: Colors.tabBar,
          //   },
          //   headerLeft: () => <></> 
          //  }}
          // initialParams={{ user: 'me' }}
        />
        <Stack.Screen 
          name="Status"
          component={StatusScreen}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
            title: 'النتائج',
          }}
        />
      </Stack.Group>

    </Stack.Navigator>
  );
}

export default RootStack
import React from 'react'
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import MarkDown from 'react-native-markdown-display'

import About from '../About'
import { BannerAdView } from '../components/AdView'

const AboutScreen = () => (
  <SafeAreaView>
    <BannerAdView type="image" media={false} />
    <ScrollView style={{ paddingLeft: 15 }}>
      <MarkDown style={markdownStyles}>{About}</MarkDown>
    </ScrollView>
  </SafeAreaView>
)

export default AboutScreen

const markdownStyles = StyleSheet.create({
  link: {
    color: 'lightblue',
    fontSize: 18,
  },
  // mailTo: {
  //     color: 'orange',
  // },
  text: {
    color: '#555555',
  },
  heading: {
    borderBottomWidth: 1,
    borderColor: '#000000',
  },
  heading1: {
    fontSize: 32,
    color: 'purple',
  },
  heading2: {
    fontSize: 24,
    margin: 10,
  },
})


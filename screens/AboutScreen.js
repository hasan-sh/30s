import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import MarkDown from 'react-native-markdown-renderer'

import About from '../About'
import { AdView } from '../components/AdView'

const AboutScreen = () => (
  <ScrollView style={{ paddingLeft: 15 }}>
    <AdView type="image" media={false} />
    <MarkDown style={markdownStyles}>{About}</MarkDown>
  </ScrollView>
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


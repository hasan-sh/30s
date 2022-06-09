import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

function MonoText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
}

MonoText.propTypes = {
  style: PropTypes.any,
}

export default MonoText

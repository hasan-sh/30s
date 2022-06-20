import React from 'react'

import Colors from '../constants/Colors'
import { IconButton } from 'react-native-paper'

class TabBarIcon extends React.Component {
  render() {
    return (
      <IconButton
        size={30}
        icon={this.props.name}
        color={
          this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
        }
      />
    )
  }
}

export default TabBarIcon

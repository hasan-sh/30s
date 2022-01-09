import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { List, TextInput, IconButton } from 'react-native-paper'
import { Text, View } from 'react-native'

function TeamListItem({ i, id, updateTeam, removeTeam, name: currentName }) {
  const [name, setName] = useState(currentName)

  return (
    <View style={{position: "relative"}}>
      <Text style={{ 
          position: 'absolute', 
          top: 0, 
          right: 0 
        }}>
        {i + 1}
      </Text>
      <List.Item
        style={{
          position: 'relative',
        }}
        left={() => (
          <TextInput
            label="إسم الفريق"
            mode="outlined"
            placeholder="إسم الفريق"
            onChangeText={setName}
            value={name}
            onBlur={e => updateTeam({ name, id })}
            returnKeyLabel="إضافة"
            style={{ flexGrow: 20 }}
          />
        )}
        right={() => (
          // <View
          // >
            <List.Icon
              icon={() => (
                <View style={{ flexDirection: 'row' }}>
                  <IconButton
                    size={30}
                    color="red"
                    icon={{ source: 'delete-forever', direction: 'rtl' }}
                    style={{padding: 0, margin: 0}}
                    onPress={() => {
                      removeTeam(id)
                    }}
                  />
                  <IconButton
                    size={30}
                    icon={{ source: 'plus-circle', direction: 'rtl' }}
                    style={{padding: 0, margin: 0}}
                    color='blue'
                  />
                </View>
              )}
              style={{ flexGrow: 0 }}
            />
          // </View>
        )}
      />
    </View>
  )
}

TeamListItem.propTypes = {
  i: PropTypes.number,
  addTeam: PropTypes.func,
  name: PropTypes.string,
}

export default TeamListItem

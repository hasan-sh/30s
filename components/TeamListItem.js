import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { List, TextInput, IconButton } from 'react-native-paper'
import { Text, View } from 'react-native'

function TeamListItem({ i, id, updateTeam, removeTeam, name: currentName }) {
  const [name, setName] = useState(currentName)

  return (
    <List.Item
      left={() => (
        <TextInput
          label="إسم الفريق"
          mode="outlined"
          placeholder="إسم الفريق"
          onChangeText={setName}
          value={name}
          onBlur={e => updateTeam({ name, id })}
          returnKeyLabel="إضافة"
          style={{ flexGrow: 100 }}
        />
      )}
      right={() => (
        <View
          style={{
            position: 'relative',
          }}
        >
          <List.Icon
            icon={() => (
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ position: 'absolute', top: 0, right: 10 }}>
                  {i + 1}
                </Text>
                <IconButton
                  size={30}
                  color="red"
                  icon={{ source: 'delete-forever', direction: 'rtl' }}
                  onPress={() => {
                    removeTeam(id)
                  }}
                />
                <IconButton
                  size={30}
                  icon={{ source: 'group', direction: 'rtl' }}
                />
              </View>
            )}
          />
        </View>
      )}
    />
  )
}

TeamListItem.propTypes = {
  i: PropTypes.number,
  addTeam: PropTypes.func,
  name: PropTypes.string,
}

export default TeamListItem

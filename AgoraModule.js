import React, { useContext, useEffect, useRef, useState } from "react"
import { PermissionsAndroid, StyleSheet, Text, View } from "react-native"
import RtcEngine, {RtcChannel} from "react-native-agora"
import { Button, TextInput } from "react-native"
import { Picker } from '@react-native-picker/picker'
import { AgoraContext } from "./state/agora"
import { Context } from "./state"



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  float: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  top: {
    width: '100%',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
  },
})


export default function Agora(props) {
    const [mode, setMode] = useState('create')
    const [{currentPlayer}] = useContext(Context)
    const [
        { engine, appId, token, channelName, joinSucceed, openMicrophone, enableSpeakerphone, peerIds, },
        { setAttribute },
    ] = useContext(AgoraContext)

    useEffect(() => {
        const requestCameraAndAudioPermission = async () => {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ])
                if (
                    granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log('You can use the mic')
                } else {
                    console.log('Permission denied')
                }
            } catch (err) {
                console.warn(err)
            }
        }
        if (Platform.OS === 'android') {
            // Request required permissions from Android
            requestCameraAndAudioPermission().then(() => {
                console.log('requested!')
            })
        }

        const init = async () => {
            const engine = await RtcEngine.create(appId)
            // Enable the audio module.
            await engine.enableAudio()
            // engine.chan
            setAttribute('engine', engine)
        }
        init()

    }, [])

    useEffect(() => {
        const init = () => {
            if (!engine) {
                return;
            }

            console.log('setup listeners...')
            // Listen for the UserJoined callback.
            // This callback occurs when the remote user successfully joins the channel.
            engine.addListener('UserJoined', (uid, elapsed) => {
                console.log('UserJoined', uid, elapsed)
                if (peerIds.indexOf(uid) === -1) {
                    console.log('when user joins', peerIds, joinSucceed)
                    setAttribute('peerIds', [...peerIds, uid])
                }
            })


            // Listen for the UserOffline callback.
            // This callback occurs when the remote user leaves the channel or drops offline.
            engine.addListener('UserOffline', (uid, reason) => {
                console.log('UserOffline', uid, reason)
                setAttribute('peerIds', peerIds.filter(id => id !== uid))
            })

            // Listen for the JoinChannelSuccess callback.
            // This callback occurs when the local user successfully joins the channel.
            engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
                console.log('JoinChannelSuccess', channel, uid, elapsed)
                setAttribute('joinSucceed', true)
            })

            return engine.removeAllListeners
        }

        console.log('call init ...')
        listeners = init()
        return listeners
    }, [engine])

    const createChannel = async () => {
        console.log('create', channelName)
        if (!channelName) 
            return;
        try {
            const channel = await RtcChannel.create(channelName)
            joinChannel(channel)
        } catch (error) {
            console.log(error)            
        }
    }

    const joinChannel = async (e=engine) => {
        try {
            let additionalInfo = null
            if (currentPlayer) {
                additionalInfo = currentPlayer.name
            }
            await e?.joinChannel(token, channelName, additionalInfo, 0)
            console.log('joined!')
        } catch (error) {
            console.log(error)            
        }
    }

    const leaveChannel = async () => {
        console.log('Leave a channel')
        await engine?.leaveChannel()
        // setJoinSucceed(false)
        setAttribute('joinSucceed', false)
        setAttribute('peerIds', [])
        // setAttribute('agora', {
        //     ...agora, 
        //     joinSucceed,
        //     openMicrophone,
        //     enableSpeakerphone,
        //     peerIds: [], joinSucceed: false})
    }

    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text style={{ flexGrow: 1 }}>القنوات</Text>
                <Picker
                    selectedValue={mode}
                    style={{ height: 50, width: 200 }}
                    onValueChange={itemValue => setMode(itemValue)}
                >
                    <Picker.Item label="أنشأ قناة" value={'create'} />
                    <Picker.Item label="إنضم لقناة" value={'join'} />
                </Picker>
            </View>
            <View style={styles.top}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setAttribute('channelName', text)}
                    placeholder={'Channel Name'}
                    value={channelName}
                />
                <Button
                    onPress={() => {
                        if (mode === 'create') {
                            return createChannel()
                        }

                        if (joinSucceed) {
                            leaveChannel()
                        } else {
                            joinChannel()
                        } 
                    }}
                    title={`${mode === 'create' ? 'Create' : (joinSucceed ? 'Leave' : 'Join')} channel`}
                />
            </View>
            <View style={styles.float}>
                <Button
                    onPress={() => {
                        // const { openMicrophone } = agora
                        engine?.enableLocalAudio(!openMicrophone).then(() => {
                            // setOpenMicrophone(!openMicrophone)
                            setAttribute('openMicrophone', !openMicrophone)
                        }).catch((err) => {
                            console.warn('enableLocalAudio', err)
                        })
                    }}
                    title={`Microphone ${openMicrophone ? 'on' : 'off'}`}
                />
                <Button
                    // onPress={this._switchSpeakerphone}
                    onPress={() => {
                        // const { enableSpeakerphone } = agora
                        engine?.setEnableSpeakerphone(!enableSpeakerphone).then(() => {
                            // setEnableSpeakerphone(!enableSpeakerphone)
                            setAttribute('enableSpeakerphone', !enableSpeakerphone)
                        }).catch((err) => {
                            console.warn('setEnableSpeakerphone', err)
                        })
                    }}
                    title={enableSpeakerphone ? 'Speakerphone' : 'Earpiece'}
                />
            </View>
        </View>
    )
}
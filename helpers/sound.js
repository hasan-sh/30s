import SoundPlayer from 'react-native-sound-player'


export const playSound = ({name, type}, pause) => {
    try {
        // play the file tone.mp3
        console.log(pause)
        if (pause) {
            SoundPlayer.pause()
            return
        }
        SoundPlayer.playSoundFile(name, type)
        SoundPlayer.setSpeaker(true)
        // SoundPlayer.setVolume(10)
        // or play from url
        // SoundPlayer.playUrl('https://example.com/music.mp3')
    } catch (e) {
        console.log(`cannot play the sound file`, e)
    }
}
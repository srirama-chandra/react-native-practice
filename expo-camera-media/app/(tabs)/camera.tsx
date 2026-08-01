
import { Button, StyleSheet } from 'react-native'
import React, {  } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';


const Camera = () => {

  const player = useAudioPlayer('https://samplelib.com/mp3/sample-3s.mp3', {downloadFirst:true});
  const state = useAudioPlayerStatus(player);

  const handlePress = () => {
    if(state.playing) {
      player.pause();
    } else {
      if(state.didJustFinish) {
        player.seekTo(0);
      }
      player.play();
    }
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <Button title={state.playing ? "Pause" : "Play"} onPress={handlePress}/>
    </SafeAreaView>
  )
}

export default Camera

const styles = StyleSheet.create({})
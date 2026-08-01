
import { Alert, Button, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { ThemedText } from '@/components/themed-text'
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context'


const Camera = () => {

  const [permission, requestPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();
  const cameraRef = useRef<CameraView>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [uri, setURI] = useState<any>();
  const [recording, setRecording] = useState(false);

  if(!permission) {
    return <ThemedText>Loading Permissions</ThemedText>
  }

  if(!permission.granted) {
    return (
      <SafeAreaView>
        <ThemedText>We need Your Permission To Acess The Camera</ThemedText>
        <Button title='Grant' onPress={requestPermission}/>
      </SafeAreaView>
    )
  }

  const recordVideo = async () => {
    if(!micPermission?.granted) {
      const result = await requestMicPermission();
      if(!result?.granted) return;
    }
    setRecording(true);
    const video = await cameraRef.current?.recordAsync();
    if(video?.uri) setURI(video.uri);
    Alert.alert(`Video Recorded at ${uri}`)
    setRecording(false);
  }

  const stopRecording = async () => {
    cameraRef.current?.stopRecording();
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <CameraView
        style={{flex:1}} 
        ref={cameraRef}
        mode='video'
        facing='front'
        onCameraReady={ () => setReady(true) }
      />
      <Button title={recording ? "Stop" : "Record"} onPress={recording ? stopRecording : recordVideo} disabled={!ready}/>
    </SafeAreaView>
  )
}

export default Camera

const styles = StyleSheet.create({})
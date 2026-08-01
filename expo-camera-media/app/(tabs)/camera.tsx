
import { Alert, Button, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { ThemedText } from '@/components/themed-text'
import { CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context'


const Camera = () => {

  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [uri, setURI] = useState<any>();

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

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePictureAsync({quality:1});
    if(photo?.uri) setURI(photo.uri);
    Alert.alert(`Photo is Saved at ${uri}`)
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <CameraView
        style={{flex:1}} 
        ref={cameraRef}
        mode='picture'
        facing='front'
        onCameraReady={ () => setReady(true) }
      />
      <Button title='Click' onPress={takePhoto} disabled={!ready}/>
    </SafeAreaView>
  )
}

export default Camera

const styles = StyleSheet.create({})
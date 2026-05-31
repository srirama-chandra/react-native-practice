import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomePage = () => {
  const {height, width} = useWindowDimensions();
  return (
    <SafeAreaView>
      <Text>HomePage</Text>
      <Text>{width>768 ? "Landscape": "Potrait"}</Text>
    </SafeAreaView>
  )
}

export default HomePage

const styles = StyleSheet.create({})
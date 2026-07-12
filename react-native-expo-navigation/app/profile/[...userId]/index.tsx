import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const ProfileDetailPage = () => {
  let { userId } = useLocalSearchParams();

  if(Array.isArray(userId)) {
    userId = (userId.join('/'))
  }

  return (
    <View>
      <Text>ProfileDetailPage</Text>
      <Text>{userId}</Text>
    </View>
  )
}

export default ProfileDetailPage

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Details = () => {
  const navigation = useNavigation<any>();
  return (
    <View>
      <Text>Details</Text>
      <Button title='Home' onPress={() => navigation.popTo('Home')}/>
    </View>
  )
}

export default Details

const styles = StyleSheet.create({})
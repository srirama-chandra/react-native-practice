import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title='Go To Profile Page'
        onPress={ () => navigation.navigate('Profile', {name:'ramesh'})}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
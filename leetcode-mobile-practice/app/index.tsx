import { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

import { useAuth } from '@/features/auth/AuthProvider'
import { signInWithGoogle } from '@/features/auth/signInWithGoogle'

export default function Index() {
  const [message, setMessage] = useState<string>()
  const { isLoggedIn, signOut } = useAuth()

  async function onLogin() {
    try {
      const result = await signInWithGoogle()
      if (result.cancelled) {
        setMessage('Sign-in cancelled. You closed the browser.')
      } else {
        setMessage('Login Successful')
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'Google sign-in failed'
      )
    }
  }



  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      {!isLoggedIn ? <Button title="Login" onPress={onLogin} /> : null}
      {message ? <Text>{message}</Text> : null}
      {isLoggedIn ? <Button title='Sign Out' onPress={signOut}/> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 8,
  },
})

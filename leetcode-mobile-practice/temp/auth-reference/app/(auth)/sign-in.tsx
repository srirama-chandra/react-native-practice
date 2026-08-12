import { useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { signInWithGoogle } from '@/features/auth/signInWithGoogle'

export default function SignInScreen() {
  const [isBusy, setIsBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function onPressGoogle() {
    setIsBusy(true)
    setMessage(null)

    try {
      const result = await signInWithGoogle()
      if (result.cancelled) {
        setMessage('Sign-in cancelled. You closed the browser.')
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'Google sign-in failed'
      )
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <Text style={styles.body}>Continue with your Google account.</Text>

      <Pressable
        style={[styles.button, isBusy && styles.buttonDisabled]}
        onPress={onPressGoogle}
        disabled={isBusy}
      >
        {isBusy ? (
          <ActivityIndicator color="#111" />
        ) : (
          <Text style={styles.buttonText}>Sign in with Google</Text>
        )}
      </Pressable>

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  body: {
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.8,
  },
  button: {
    marginTop: 8,
    minWidth: 220,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  message: {
    textAlign: 'center',
    color: '#555',
  },
})

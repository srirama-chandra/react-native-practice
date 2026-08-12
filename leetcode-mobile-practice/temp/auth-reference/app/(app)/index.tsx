import { useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { useAuth } from '@/features/auth/AuthProvider'

export default function HomeScreen() {
  const { session, signOut } = useAuth()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function onSignOut() {
    setIsSigningOut(true)
    setErrorMessage(null)

    try {
      await signOut()
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Sign out failed'
      setErrorMessage(message)
      setIsSigningOut(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.body}>
        {`Signed in as\n${session?.user?.email ?? '(no email)'}`}
      </Text>

      <Pressable
        style={[styles.button, isSigningOut && styles.buttonDisabled]}
        onPress={onSignOut}
        disabled={isSigningOut}
      >
        {isSigningOut ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign out</Text>
        )}
      </Pressable>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
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
  },
  button: {
    marginTop: 8,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#111',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  error: {
    color: '#b00020',
    textAlign: 'center',
  },
})

import { Redirect, Stack } from 'expo-router'

import { useAuth } from '@/features/auth/AuthProvider'

export default function AppLayout() {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/sign-in" />
  }

  return <Stack screenOptions={{ headerShown: false }} />
}

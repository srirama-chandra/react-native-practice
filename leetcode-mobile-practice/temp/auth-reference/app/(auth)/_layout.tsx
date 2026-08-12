import { Redirect, Stack } from 'expo-router'

import { useAuth } from '@/features/auth/AuthProvider'

export default function AuthLayout() {
  const { isLoggedIn } = useAuth()

  if (isLoggedIn) {
    return <Redirect href="/(app)" />
  }

  return <Stack screenOptions={{ headerShown: false }} />
}

import { Redirect } from 'expo-router'

import { useAuth } from '@/features/auth/AuthProvider'

export default function Index() {
  const { isLoggedIn } = useAuth()
  return <Redirect href={isLoggedIn ? '/(app)' : '/(auth)/sign-in'} />
}

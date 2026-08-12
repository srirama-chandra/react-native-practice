import 'react-native-url-polyfill/auto'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient, type SupportedStorage } from '@supabase/supabase-js'
import { Platform } from 'react-native'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_KEY in .env'
  )
}

const memoryStorage: SupportedStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
}

const isServer = Platform.OS === 'web' && typeof window === 'undefined'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: isServer ? memoryStorage : AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

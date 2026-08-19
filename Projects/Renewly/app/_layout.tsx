import '@/global.css';
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style='inverted'/>
      <Stack screenOptions={{headerShown: false}}/>
    </>  
  )
}

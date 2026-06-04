import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/pages/Home';
import Profile from './src/pages/Profile';
import { createStaticNavigation } from '@react-navigation/native';

export default function App() {
  const Stack = createNativeStackNavigator<any>({
    screens: {
      'Home': Home,
      'Profile': Profile
    }
  });

  const Navigation = createStaticNavigation(Stack);

  return (
    <Navigation></Navigation>
  )

};

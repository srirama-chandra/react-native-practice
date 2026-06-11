import { Text, View } from 'react-native';
import StaticNativeStackNavigator from './src/navigation/StaticNativeStackNavigator';
import DynamicNativeStackNavigation from './src/navigation/DynamicNativeStackNavigator';

export default function App() {
  return (
    <DynamicNativeStackNavigation/>
  );
}
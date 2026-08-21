import { styled } from 'nativewind';
import { Text } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView);
 
export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Text className="text-xl font-sans-light text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Text className="text-xl font-sans text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Text className="text-xl font-sans-medium text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Text className="text-xl font-sans-semibold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Text className="text-xl font-sans-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Text className="text-xl font-sans-extrabold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </SafeAreaView>
  );
}
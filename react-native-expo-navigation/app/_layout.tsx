import { Stack } from "expo-router";

export default function RootLayout() {

  const isLoggedIn = false;

  return <Stack>
    <Stack.Screen name="index"/>

    <Stack.Protected guard={!isLoggedIn}>
      <Stack.Screen name="login"/>
    </Stack.Protected>
  </Stack>
}

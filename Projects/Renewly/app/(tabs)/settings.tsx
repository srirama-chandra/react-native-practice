import { useClerk, useUser } from '@clerk/expo';
import { selectionAsync } from 'expo-haptics';
import { styled } from 'nativewind';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Settings = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const email = user?.primaryEmailAddress?.emailAddress;

  return (
    <SafeAreaView className='flex-1 bg-background p-5'>
      <Text className='settings-title'>Settings</Text>

      <View className='settings-card'>
        <Text className='settings-label'>Signed in as</Text>
        <Text className='settings-value'>{email ?? 'Your Renewly account'}</Text>
      </View>

      <Pressable
        className='settings-sign-out'
        onPress={() => {
          selectionAsync();
          signOut();
        }}
      >
        <Text className='settings-sign-out-text'>Sign out</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Settings;

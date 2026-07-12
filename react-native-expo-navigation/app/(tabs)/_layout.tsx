import { NativeTabs, Label, Icon} from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
    return (
        <NativeTabs>
            <NativeTabs.Trigger name='index'>
                <Label>Home</Label>
                <Icon sf="house.fill" drawable="custom_android_drawable" />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name='profile'>
                <Label>Profile</Label>
                <Icon sf="person" drawable="custom_android_drawable" />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name='settings'>
                <Label>Settings</Label>
                <Icon sf="airpodspro" drawable="custom_android_drawable" />
            </NativeTabs.Trigger>
        </NativeTabs>
    )
}
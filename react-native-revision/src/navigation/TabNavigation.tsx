import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackNavigation } from "./StackNavigations";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HomeScreen from "../screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export function MyTabNavigation() {
    return (
        <Tab.Navigator initialRouteName='HomeTab' screenOptions={
            ({route}) => ({
                headerShown:false,
                tabBarIcon: ({focused, color, size}) => {
                    let icon:any;
                    if(route.name==="HomeTab") {
                        icon = focused ? "home" : "home-outline"
                    }
                    return <Ionicons name={icon} color={color} size={size}/>
                }
            })
        }>
            <Tab.Screen name='HomeTab' options={{title:'Home'}} component={HomeScreen}/>
            <Tab.Screen name='ProfileTab' options={{title:'Profile'}} component={ProfileScreen}/>
            <Tab.Screen name='SettingsTab' options={{title:'Settings'}} component={SettingsScreen}/>
        </Tab.Navigator>
    )
}

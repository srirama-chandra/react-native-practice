import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../pages/HomeScreen";
import ProfileScreen from "../pages/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

const BottomTab = createBottomTabNavigator();

function MyBottomTabBar() {
    return (
        <BottomTab.Navigator initialRouteName="Home" screenOptions={
            ({route}) => ({
              tabBarIcon: ({focused, color, size})  => {
                let icon : any;

                if(route.name==="Home") {
                    icon = focused ? 'home' : 'home-outline'
                }
                else {
                    icon = focused ? 'person' : 'person-outline'
                }
                return <Ionicons name={icon} size={size} color={color}/>
              }
            })
        }>
            <BottomTab.Screen name="Home" component={HomeScreen} />
            <BottomTab.Screen name="Profile" component={ProfileScreen}/>
        </BottomTab.Navigator>
    )
}

export default function DynamicTabNavigation() {
    return (
        <NavigationContainer>
            <MyBottomTabBar/>
        </NavigationContainer>
    )
}
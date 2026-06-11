import { createMaterialTopTabNavigator, MaterialTopTabBar } from "@react-navigation/material-top-tabs";
import HomeScreen from "../pages/HomeScreen";
import ProfileScreen from "../pages/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";

const TopBar = createMaterialTopTabNavigator();

function MyTopBar() {
    return (
        <TopBar.Navigator>
            <TopBar.Screen name="Home" component={HomeScreen}/>
            <TopBar.Screen name="Profile" component={ProfileScreen}/>
        </TopBar.Navigator>
    )
}

export default function DynamicTopBar() {
    return (
        <NavigationContainer>
            <MyTopBar/>
        </NavigationContainer>
    )
}
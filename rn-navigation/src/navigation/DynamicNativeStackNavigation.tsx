import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Details from "../pages/Details";

const NativeStackNavigator = createNativeStackNavigator();

function StackNavigator() {
    return (
        <NativeStackNavigator.Navigator>
            <NativeStackNavigator.Screen name="Home" component={Home}/>
            <NativeStackNavigator.Screen name="Profile" component={Profile}/>
            <NativeStackNavigator.Screen name="Details" component={Details}/>
        </NativeStackNavigator.Navigator>
    )
}

export default function DynamicNativeStackNavigation() {
    return (
        <NavigationContainer>
            <StackNavigator/>
        </NavigationContainer>
    )
}
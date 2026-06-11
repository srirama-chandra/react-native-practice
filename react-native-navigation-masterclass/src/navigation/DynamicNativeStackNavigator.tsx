import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../pages/HomeScreen";
import ProfileScreen from "../pages/ProfileScreen";
import DetailsScreen from "../pages/DetailsScreen";

const MyStack = createNativeStackNavigator();

function StackNavigation() {
    return (
        <MyStack.Navigator>
            <MyStack.Screen name="Home" component={HomeScreen} />
            <MyStack.Screen name="Profile" component={ProfileScreen} />
            <MyStack.Screen name="Details" component={DetailsScreen} />
        </MyStack.Navigator>
    )
}

export default function DynamicNativeStackNavigation() {
    return (
        <NavigationContainer>
            <StackNavigation />
        </NavigationContainer>
    )
}
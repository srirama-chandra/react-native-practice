import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../pages/HomeScreen";
import ProfileScreen from "../pages/ProfileScreen";
import DetailsScreen from "../pages/DetailsScreen";
import { createStaticNavigation } from "@react-navigation/native";

const StackNavigator = createNativeStackNavigator({
    initialRouteName:'Home',
    screens: {
        'Home': HomeScreen,
        'Profile': ProfileScreen,
        'Details': DetailsScreen
    }
});

const MyStack = createStaticNavigation(StackNavigator);

export default function StaticNativeStackNavigator() {
    return <MyStack/>
}
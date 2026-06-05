import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Details from "../pages/Details";

const NativeStackNavigator = createNativeStackNavigator({
    initialRouteName: 'Home',
    screens: {
        'Home': Home,
        'Profile': Profile,
        'Details': Details
    }
});

const StaticStackNavigation = createStaticNavigation(NativeStackNavigator);

export default function StaticNativeStackNavigation() {
    return (
        <StaticStackNavigation/>
    )
}
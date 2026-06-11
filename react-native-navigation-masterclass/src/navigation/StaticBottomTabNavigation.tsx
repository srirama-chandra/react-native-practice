import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStaticNavigation } from "@react-navigation/native";
import HomeScreen from "../pages/HomeScreen";
import ProfileScreen from "../pages/ProfileScreen";
import DetailsScreen from "../pages/DetailsScreen";

const TabBar = createBottomTabNavigator({
    initialRouteName:'Home',
    screens: {
        'Home': HomeScreen,
        'Profile': ProfileScreen,
        'Details': DetailsScreen
    }
});

const MyTabBar = createStaticNavigation(TabBar);

export default function StaticBottomTab(){
    return <MyTabBar/>
}
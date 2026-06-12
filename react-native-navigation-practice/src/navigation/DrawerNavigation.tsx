import { createDrawerNavigator } from "@react-navigation/drawer";
import { MyTabNavigation } from "./TabNavigation";
import SettingsScreen from "../screens/SettingsScreen";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={MyTabNavigation} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
    )
}

export default function DrawerNavigation() {
    return (
        <NavigationContainer>
            <MyDrawer/>
        </NavigationContainer>
    )
}

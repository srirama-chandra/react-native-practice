import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import AboutPage from "../screens/AboutPage";
import { MyTabNavigation } from "./TabNavigation";

const Drawer = createDrawerNavigator()

export function MyDrawer() {
    return (
        <Drawer.Navigator screenOptions={{}} initialRouteName="Home" >
            <Drawer.Screen name="Home" component={MyTabNavigation}/>
            <Drawer.Screen name="About" component={AboutPage}/>
        </Drawer.Navigator>
    )
}

export function Navigation() {
    return (
        <NavigationContainer >
            <MyDrawer/>
        </NavigationContainer>
    )
}

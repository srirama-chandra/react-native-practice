import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../pages/HomeScreen";
import ProfileScreen from "../pages/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator()

function MyDrawer() {
    return (<Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen}/>
        <Drawer.Screen name="Profile" component={ProfileScreen}/>
    </Drawer.Navigator>)
}

export default function DynamicDrawer() {
    return <NavigationContainer>
        <MyDrawer/>
    </NavigationContainer>
}
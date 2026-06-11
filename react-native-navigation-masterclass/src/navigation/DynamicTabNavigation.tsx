import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../pages/HomeScreen";
import ProfileScreen from "../pages/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "../pages/DetailsScreen";


const MyStack = createNativeStackNavigator();

function StackNavigation() {
    return (
        <MyStack.Navigator>
            <MyStack.Screen name="Home" component={HomeScreen}/>
            <MyStack.Screen name="Profile" component={ProfileScreen}/>
            <MyStack.Screen name="Details" component={DetailsScreen}/>
        </MyStack.Navigator>
    )
}

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
            <BottomTab.Screen name="Home" component={StackNavigation} options={{headerShown:false}}/>
            <BottomTab.Screen name="Profile" component={ProfileScreen} options={{tabBarBadge:1}}/>
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
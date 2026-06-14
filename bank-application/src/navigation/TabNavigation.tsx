import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../pages/HomeScreen";
import PaymentsScreen from "../pages/PaymentsScreen";
import WalletScreen from "../pages/WalletScreen";
import LoanScreen from "../pages/LoanScreen";
import SettingsScreen from "../pages/SettingsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tabs.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
            <Tabs.Screen name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) => {
                        return <Ionicons name= { focused ? 'home' : 'home-outline'} color={color} size={size}/>
                    }
                }}
            />
            <Tabs.Screen 
                name="Payments"
                component={PaymentsScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) => {
                        return <Ionicons name= { focused ? 'swap-horizontal' : 'swap-horizontal-outline'} color={color} size={size}/>
                    }
                }}
            />
            <Tabs.Screen
                name="Wallet"
                component={WalletScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) => {
                        return <Ionicons name= { focused ? 'wallet' : 'wallet-outline'} color={color} size={size}/>
                    }
                }}
            />
            <Tabs.Screen
                name="Loans"
                component={LoanScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) => {
                        return <Ionicons name= { focused ? 'cash' : 'cash-outline'} color={color} size={size}/>
                    }
                }}
            />
            <Tabs.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) => {
                        return <Ionicons name= { focused ? 'cog' : 'cog-outline'} color={color} size={size}/>
                    }
                }}
            />
        </Tabs.Navigator>
    )
}

export default function TabNavigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    )
}
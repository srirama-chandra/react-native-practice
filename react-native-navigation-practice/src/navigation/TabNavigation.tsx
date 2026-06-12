import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MessagesScreen from "../screens/MessagesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { MyStackNavigation } from "./StackNavigation";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export function MyTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let icon: any;
          if (route.name === "Home") {
            icon = focused ? "home" : "home-outline";
          } else if (route.name === "Messages") {
            icon = focused ? "chatbubble" : "chatbubble-outline";
          } else {
            icon = focused ? "person" : "person-outline";
          }
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={MyStackNavigation} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

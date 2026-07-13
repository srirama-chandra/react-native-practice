import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons'

function MyTabNavigation({state, descriptors, navigation}:BottomTabBarProps) {
    return <View style={{flexDirection:'row', padding:10}}>
        { state.routes.map((route, index) => {

            const isFocused = state.index === index;

            const { options } = descriptors[route.key];

            return <View style={{flex:1, alignItems:'center'}}>
                <TouchableOpacity key={route.key} onPress={() => navigation.navigate(route.name)} style={{alignItems:'center'}}>
                    <Ionicons name={route.name==='index' ? 'home' : route.name==='Profile' ? 'person' : 'settings'} size={24} color={isFocused ? 'green' : 'black'}/>
                    <Text style={{color: isFocused ? 'tomato' : 'black'}}>{options.title}</Text>
                </TouchableOpacity>
            </View>
        })}
    </View>
}

export default function TabLayout() {
    return <Tabs tabBar={ (props) => <MyTabNavigation {...props}/>}>
        <Tabs.Screen name="index" options={{title:"Home"}}/>
        <Tabs.Screen name="Profile" options={{title:"Profile"}}/>
        <Tabs.Screen name="Settings" options={{title:"Settings"}}/>
    </Tabs>
}
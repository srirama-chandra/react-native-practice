import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';

function MyTabBar({state, descriptors, navigation}: BottomTabBarProps) {
    return <View style={{flexDirection:'row', padding:10, gap:4}}>
        {state.routes.map((route,index) => {
            const isFocused = state.index === index;
            const { options } = descriptors[route.key];
            const color = isFocused ? "red" : "black";


            return <TouchableOpacity 
                key={route.key}
                onPress={ () => navigation.navigate(route.name)}
                style={{flex:1, alignItems:'center',marginBottom:8, gap:2, backgroundColor:'cyan'}}
            >
                {options.tabBarIcon?.({
                    focused: isFocused,
                    color,
                    size:24
                })}
                <Text style={{color: isFocused ? 'red' : 'black'}}>{options.title}</Text>
                
            </TouchableOpacity>

        })}
    </View>
}

export default function TabLayout() {
    return <Tabs tabBar={(props) => <MyTabBar {...props}/>}> 
        <Tabs.Screen name="index" options={{title:"Home", tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color}/>}}/>
        <Tabs.Screen name="profile" options={{title:"Profile", tabBarIcon: ({color})=><Ionicons name="person" size={24} color={color}/> }}/>
        <Tabs.Screen name="settings" options={{title:"Settings", tabBarIcon: ({color})=><Ionicons name="airplane" size={24} color={color}/> }} />
    </Tabs>
}
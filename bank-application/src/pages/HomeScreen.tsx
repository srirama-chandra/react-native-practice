import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

const HomeScreen = () => {
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#F9F9F9'
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 16,
                marginBottom: 16,
            }}>
                <View style={{ backgroundColor: 'white', borderRadius: 24, padding: 4 }}>
                    <Ionicons name='person-circle-outline' size={30} />
                </View>
                <View style={{ backgroundColor: 'white', borderRadius: 24, padding: 4 }}>
                    <Ionicons name='notifications-outline' size={30} />
                </View>
            </View>
            <View style={{ alignItems: 'center', marginBottom:32 }}>
                <Text style={{ fontWeight: '400', marginBottom: 12, fontSize: 16, color: 'grey' }}>Your Balance</Text>
                <Text style={{ fontSize: 32, fontWeight: '700' }}>$8,124.53</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:32}}>
                <View style={{flexDirection:'row', gap:8, backgroundColor:'#2056D5', borderRadius:32,paddingVertical:16, paddingHorizontal:40}}>
                    <Ionicons name='arrow-up' size={16} color={'white'}/>
                    <Text style={{color:'white', fontWeight:700}}>Send</Text>
                </View>
                <View style={{flexDirection:'row', 
                    gap:8, backgroundColor:'#e9e6e6', 
                    borderRadius:32,
                    paddingVertical:16, 
                    paddingHorizontal:40,
                }}>
                    <Ionicons name='arrow-down' size={16}/>
                    <Text style={{color:'black', fontWeight:700}}>Receive</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
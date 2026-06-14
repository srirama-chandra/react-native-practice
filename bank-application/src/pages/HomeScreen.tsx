import { Pressable, ScrollView, StyleSheet, Text, Vibration, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import WalletCard from '../components/WalletCard'
import ActivityCard from '../components/ActivityCard'

const HomeScreen = () => {
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#f9f9f900'
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
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:32,marginBottom:16, marginHorizontal:12}}>
                <Text style={{fontWeight:600}}>Wallet</Text>
                <Pressable>
                    <Text style={{color:'grey'}}>View All</Text>
                </Pressable>
            </View>
            <ScrollView style={{flexDirection:'row', marginBottom:32, maxHeight:120}} horizontal showsHorizontalScrollIndicator={false}>
                <WalletCard icon={'stats-chart-outline'} title={'Investment'} price={1658} color={'green'}/>
                <WalletCard icon={'airplane-outline'} title={'Travel'} price={2312} color={'blue'}/>
                <WalletCard icon={'fast-food-outline'} title={'Food'} price={1658} color={'brown'}/>
            </ScrollView>
            <View>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:8}}>
                    <Text style={{fontWeight:600}}>Activity</Text>
                    <Text style={{color:'grey'}}>View All</Text>
                </View>
            </View>
            <View style={{marginTop:4}}>
                <ActivityCard icon={'logo-apple'} title={'Apple icloud'} time={'5 min ago'} price={999} type={'Debit'} color={'silver'}/>
                <ActivityCard icon={'logo-youtube'} title={'Youtube Premium'} time={'8 min ago'} price={129} type={'Debit'} color={'red'}/>
                <ActivityCard icon={'logo-paypal'} title={'Salary'} time={'10 min ago'} price={254} type={'Credit'} color={'blue'}/>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
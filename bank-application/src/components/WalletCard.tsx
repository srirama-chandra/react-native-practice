import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const WalletCard = ({icon, title, price, color } : any) => {
  return (
    <View style={{backgroundColor:'white',
        marginHorizontal:12,
        borderRadius:12,
        height:120,
        width:150,
        paddingHorizontal:8,
        paddingVertical:8
    }}>
        <View style={{marginBottom:28}}>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <View style={{borderRadius:4}}><Ionicons name={icon} size={32} color={color}/></View>
                <Ionicons name='ellipsis-vertical-outline'/>
            </View>
        </View>

        <View>
            <Text style={{fontWeight:'700', color:'grey'}}>{title}</Text>
            <Text style={{fontWeight:'600'}}>{"$ "+price}</Text>
        </View>
    </View>
  )
}

export default WalletCard

const styles = StyleSheet.create({})
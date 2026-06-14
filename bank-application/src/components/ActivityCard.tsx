import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const ActivityCard = ({ icon, title, time, price, type, color }: any) => {
  return (
    <View style={{ marginHorizontal:8, marginTop:8, flexDirection: "row", justifyContent:'space-between',backgroundColor:'white', borderRadius:20, padding:12 }}>
      
      <View style={{flexDirection:"row", gap:12}}>
        <Ionicons name={icon} size={32} color={color}/>
        <View style={{ flexDirection: "column", gap:2 }}>
          <Text>{title}</Text>
          <Text style={{color:'grey'}}>{time}</Text>
        </View>
      </View>

      <View style={{gap:2}}>
          <Text style={{ color: type==="Credit" ? 'green' : 'red', fontWeight:500}}>{"$"+price}</Text>
          <Text style={{color:'grey'}}>{type}</Text>
      </View>

    </View>
  );
};

export default ActivityCard;

const styles = StyleSheet.create({});

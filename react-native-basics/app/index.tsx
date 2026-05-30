
import { useState } from "react";
import { View, Pressable, Text, ScrollView, Button, Switch, FlatList } from "react-native";

export default function Home() {

  const users = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    age: 24,
  },
  {
    id: 2,
    name: "Priya Reddy",
    email: "priya@example.com",
    age: 27,
  },
  {
    id: 3,
    name: "Arjun Kumar",
    email: "arjun@example.com",
    age: 22,
  },
  {
    id: 4,
    name: "Sneha Patel",
    email: "sneha@example.com",
    age: 29,
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram@example.com",
    age: 31,
  },
];

  return(
    <FlatList
      data={users}
      keyExtractor={ (item) => item.id.toString() }
      renderItem={ ({item}) => <Text>{item.name}</Text>}
      ItemSeparatorComponent={() => <View style={{height:1, backgroundColor:'black'}}/>}
    />
  )
}

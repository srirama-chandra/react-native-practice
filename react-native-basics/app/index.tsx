
import { useState } from "react";
import { View, Pressable, Text, ScrollView, Button, Switch } from "react-native";

export default function Home() {

  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView style={{flex:1, padding:2, backgroundColor:'black'}}>
      <Switch
        value={darkMode}
        onValueChange={setDarkMode}
        thumbColor={'white'}
        trackColor={{false:'#7E8274', true:'green'}}
      />
    </ScrollView>
  );
}

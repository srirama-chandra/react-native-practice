import { useState } from 'react';
import { TextInput, View } from 'react-native';

export default function Home() {
  const [userName, setUserName] = useState("");
  console.log(userName)
  return(
    <View>
      <TextInput 
        placeholder='Enter Your Username'
        placeholderTextColor={"black"}
        style={{
          borderWidth:1,
          borderColor:'black',
          borderRadius:4,
          marginVertical:5,
          marginHorizontal:10,
          padding:8,
          fontSize: 16
        }}
        onChangeText={setUserName}
      />
    </View>
  )
}
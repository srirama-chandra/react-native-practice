
import { View, Button, KeyboardAvoidingView, TextInput, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={{flex:1}}>
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==="ios"? "padding": "height"} keyboardVerticalOffset={100}>
      <View style={{flex:1, justifyContent:'flex-start'}}>
        <TextInput style={{borderColor:'black', borderWidth:1}}/>
        <TextInput style={{borderColor:'black', borderWidth:1}}/>
        <Button title="Click" color={'green'}/>
      </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
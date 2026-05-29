import { View, Pressable, Text} from 'react-native';

export default function Home() {
  
  return(
    <View>
      <Pressable
        onPress={() => alert("You Clicked On The Button")}
        hitSlop={50}
        style= { ({pressed}) => pressed ? {backgroundColor:'green', height:25, width:100} : {backgroundColor: 'blue', height:25, width: 100}}
      >
        {({pressed}) => pressed ? <Text>Pressed</Text> : <Text>Press</Text>}
      </Pressable>
    </View>
  )
}
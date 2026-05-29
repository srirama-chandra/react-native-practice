import { Image, Text, View } from 'react-native';

export default function Home() {
  return(
    <View>
      <Text>Hello</Text>
      {/* <Image style={{height:250, width:350, margin:10 }} source={{uri:"https://chaicode.com/assets/mobile-dev-light-CL3q443J.webp"}}/> */}
      <Image source={require('@/assets/images/nature-unsplash.jpg')} style={{height:650, width:350, marginLeft:10}}/>
    </View>
  )
}
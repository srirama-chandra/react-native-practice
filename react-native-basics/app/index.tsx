import { View, Pressable, Text, ScrollView } from "react-native";

export default function Home() {
  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2,
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  return (
    <ScrollView>
      {arr.map((item, index) => {
        return <View key={index} style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 10,
          marginBottom: 10,
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius:4,
          elevation:2
        }}>
          <Text>{item}</Text>
        </View>
      })}
    </ScrollView>
  );
}

import { StyleSheet, Text } from "react-native";
import React from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const HomePage = () => {
  const insetValues = useSafeAreaInsets();
  return (
    <SafeAreaView style={{flex:1, paddingHorizontal:16, paddingVertical:12}}>
      <Text style={styles.heading}>Hello World</Text>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  heading: {
    color: 'black',
    fontWeight: 600,
    fontSize: 32
  }
});

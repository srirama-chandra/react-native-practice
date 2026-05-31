import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomePage = () => {
  const insetValues = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insetValues.top,
        paddingBottom: insetValues.bottom,
        paddingLeft: insetValues.left,
        paddingRight: insetValues.right,
      }}
    >
      <Text>Home Page</Text>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({});

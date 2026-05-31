import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";

const HomePage = () => {
  const { height, width } = useWindowDimensions();

  const onPotrait = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP,
    );
  };

  const onLandscape = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE,
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>HomePage</Text>
      <Text>{width > height ? "Landscape" : "Potrait"}</Text>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Pressable
          onPress={onPotrait}
          style={{ padding: 16, backgroundColor: "green" }}
        >
          <Text>Rotate Potrait</Text>
        </Pressable>
        <Pressable
          onPress={onLandscape}
          style={{ padding: 16, backgroundColor: "purple" }}
        >
          <Text>Rotate Landscape</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({});

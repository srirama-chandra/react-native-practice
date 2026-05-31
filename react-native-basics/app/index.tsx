import {
  ColorSchemeName,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";

const HomePage = () => {
  const devicePreferredTheme = useColorScheme();
  const [mode, setMode] = useState<ColorSchemeName>(devicePreferredTheme);
  const isDark = mode === "dark";
  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? "black" : "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={toggleTheme}
        style={{ backgroundColor: isDark ? "white" : "black" }}
      >
        <Text
          style={{
            color: isDark ? "black" : "white",
            padding: 16,
            fontWeight: 900,
          }}
        >
          {isDark ? "Light Mode" : "Dark Mode"}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({});

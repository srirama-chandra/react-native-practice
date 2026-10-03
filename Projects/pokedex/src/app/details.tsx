import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Pokemon } from ".";

const Details = () => {
  const { name, front_image } = useLocalSearchParams() as unknown as Pokemon;

  return (
    <View style={styles.container}>
      {Platform.OS === "android" ? <View style={styles.grabber} /> : null}
      <View style={styles.subContainer}>
        <Text style={styles.textStyle}>{name}</Text>
        <Image source={{ uri: front_image }} style={styles.imageStyle} />
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: "white",
  },
  grabber: {
    alignSelf: "center",
    height: 8,
    width: 48,
    borderRadius: 16,
    backgroundColor: "gray",
  },
  imageStyle: {
    height: 200,
    width: 200,
    alignSelf: "center",
  },
  textStyle: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "600",
  },
  subContainer: {
    paddingTop: 16,
  },
});

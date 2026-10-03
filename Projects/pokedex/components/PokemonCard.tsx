import { Pokemon } from "@/app";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const PokemonCard = ({ name, back_image, front_image }: Pokemon) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.navigate({
          pathname: "/details",
          params: { name, front_image },
        })
      }
    >
      <Text style={styles.textStyle}>{name}</Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: front_image }} style={styles.PokemonImage} />
        <Image source={{ uri: back_image }} style={styles.PokemonImage} />
      </View>
    </Pressable>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "skyblue",
    borderRadius: 28,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  textStyle: {
    alignSelf: "center",
    paddingTop: 16,
    fontSize: 24,
    fontWeight: 600,
  },
  PokemonImage: {
    height: 150,
    width: 150,
  },
});

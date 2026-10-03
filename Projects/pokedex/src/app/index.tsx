import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PokemonCard from "../../components/PokemonCard";

export interface Pokemon {
  name: string;
  back_image: string;
  front_image: string;
}

const Index = () => {
  const insets = useSafeAreaInsets();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  async function fetchPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    const data = await response.json();
    const res = data.results;

    const val = res.map((pokemon: { name: string; url: string }) => {
      const id = pokemon.url.split("/").filter(Boolean).pop();
      return {
        name: pokemon.name,
        back_image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${id}.png`,
        front_image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`,
      };
    });

    setPokemons(val);
  }

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <FlatList
      data={pokemons}
      keyExtractor={(item) => item.name}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 16 + insets.bottom,
        gap: 16,
      }}
      renderItem={({ item }) => (
        <PokemonCard
          name={item.name}
          back_image={item.back_image}
          front_image={item.front_image}
        />
      )}
    />
  );
};

export default Index;

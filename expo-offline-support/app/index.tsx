import { Text, View } from "react-native";
import { File, Directory, Paths } from 'expo-file-system';
import { Button } from "@react-navigation/elements";
import { useState } from "react";

export default function Index() {

  const demoFile = new File(
    Paths.document,
    "demo.txt"
  )
  
  const writeFile = () => {
    demoFile.write("Hello World");
  }

  const getData = async () => {
    const data = await demoFile.text();
    return data;
  }

  const [data, setData ] = useState<string>();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>

      <Button onPress={ () => {
        writeFile();
        setData("Wrote")
      } }>Write File</Button>
      <Button onPress={ async () => {
        const text = await getData()
        setData(text);
      } }>Read File</Button>

      <Text>{data}</Text>

    </View>
  );
}

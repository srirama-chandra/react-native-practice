import { Text, View } from "react-native";
import useAccelerometer from "./hooks/useAccelerometer";

export default function Index() {

  const { aX, aY, aZ } = useAccelerometer();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Text>aX {aX}</Text>
      <Text>aY {aY}</Text>
      <Text>aZ {aZ}</Text>
    </View>
  );
}

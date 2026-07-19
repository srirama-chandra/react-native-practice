import { Text, View } from "react-native";
import useAccelerometer from "./hooks/useAccelerometer";
import useMagnetoMeter from "./hooks/useMagnetoMeter";

export default function Index() {

  const { available, header } = useMagnetoMeter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Text>{available}</Text>
      <Text>{header.toFixed(0)}°</Text>

    </View>
  );
}

import { Text, View } from "react-native";
import useAccelerometer from "./hooks/useAccelerometer";
import useMagnetoMeter from "./hooks/useMagnetoMeter";
import useDeviceMotionSensor from "./hooks/useDeviceMotion";

export default function Index() {

  const { available, shakeCount } = useDeviceMotionSensor();

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
      <Text>{shakeCount}</Text>

    </View>
  );
}

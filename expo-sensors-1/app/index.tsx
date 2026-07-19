import { Text, View } from "react-native";
import useAccelerometer from "./hooks/useAccelerometer";
import useMagnetoMeter from "./hooks/useMagnetoMeter";
import useDeviceMotionSensor from "./hooks/useDeviceMotion";
import usePedometer from "./hooks/usePedometer";

export default function Index() {

  const { available, currentStepCount, previousStepCount } = usePedometer();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Text style={{color:'blue'}}>{String(available).toUpperCase()}</Text>
      <Text>{previousStepCount}</Text>
      <Text>{currentStepCount}</Text>

    </View>
  );
}

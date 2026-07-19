import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";

export default function usePedometer() {
  const [available, setAvailable] = useState(false);
  const [previousStepCount, setPreviousStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  useEffect(() => {
    let subscribe: { remove: () => void } | undefined;

    (async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      setAvailable(isAvailable);

      if (!isAvailable) return;

      const permission = await Pedometer.requestPermissionsAsync();

      if (permission.status !== "granted") {
        console.log("Permission:", permission.status);
        return;
      }
      const start = new Date();
      const end = new Date();
      start.setDate(start.getDate() - 1);

      const pastCount = await Pedometer.getStepCountAsync(start, end);

      setPreviousStepCount(pastCount.steps);

      subscribe = Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps);
      });
    })();
    return () => subscribe?.remove();
  }, []);

  return { available, previousStepCount, currentStepCount };
}

import { DeviceMotion } from "expo-sensors";
import { useEffect, useRef, useState } from "react";

export default function useDeviceMotionSensor() {

    const [available, setAvailable] = useState(false);
    const [force, setForce] = useState(0);
    const [shakeCount, setShakeCount] = useState(0);
    const lastShakeTime= useRef(0);

    useEffect( () => {
        let subscribe : { remove : () => void };
        (async () => {
            const isAvailable = await DeviceMotion.isAvailableAsync();
            setAvailable(isAvailable);

            if(!isAvailable) return;

            DeviceMotion.setUpdateInterval(100);
            
            subscribe = DeviceMotion.addListener( ({acceleration}) => {
                if (!acceleration) return;
                const totalForce = Math.hypot(acceleration.x, acceleration.y, acceleration.z);
                const now = Date.now();
                if( totalForce > 8 && now - lastShakeTime.current > 1000 ) {
                    lastShakeTime.current=now;
                    setShakeCount((shakeCount) => shakeCount+1)
                }
            })
            return () => subscribe.remove();
        })();

        
    }, []);

    return { available, shakeCount}

}
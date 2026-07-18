import { Accelerometer, Gyroscope } from 'expo-sensors';
import { useEffect, useState } from 'react';

export default function useAccelerometer() {

    const [available, setAvailable] = useState<boolean>(false);
    const [aX, setAX] = useState(0);
    const [aY, setAY] = useState(0);
    const [aZ, setAZ] = useState(0);

    useEffect(() => {

        let subscription : { remove : () => void } | undefined;

        (async() => {
            const isAvailable = await Gyroscope.isAvailableAsync();
            console.log(isAvailable)
            setAvailable(() => isAvailable);

            if(!isAvailable) {
      
                return;
            }

            Gyroscope.setUpdateInterval(1000);
            subscription = Gyroscope.addListener((data) => {
                setAX(data.x);
                setAY(data.y);
                setAZ(data.z);
            })

        })();

        return () => subscription?.remove();
    }, [])

    return {
        available,
        aX,
        aY,
        aZ
    }
}
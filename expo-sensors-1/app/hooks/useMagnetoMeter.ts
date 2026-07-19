import { Magnetometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

export default function useMagnetoMeter() {

    const [available, setAvailable] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [z, setZ] = useState(0);
    const [header, setHeader] = useState(0);

    useEffect(() => {
        let subscribe : { remove : () => void };
        (async () => {
            const isAvailable = await Magnetometer.isAvailableAsync();
            setAvailable(isAvailable);

            if(!isAvailable) return;

            Magnetometer.setUpdateInterval(100);

            subscribe = Magnetometer.addListener( (data) => {
                setX(data.x);
                setY(data.y);
                setZ(data.z);
                setHeader(getHeader(data.x, data.y));
            })

            return () => subscribe?.remove();

        })();
    }, [])

    function getHeader(x: number, y: number) {

        const radians = Platform.OS==="ios" ? Math.atan2(x,y) : Math.atan2(-x, -y);

        const degrees = (radians * 180) / Math.PI;

        return (degrees + 360) % 360;
    }

    return { x, y, z, header, available}

}
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {

  const [data, setData] = useState<string>();

  useEffect(() => {

    async function getData() {
      const response = await fetch('http://localhost:8081/api/hello');
      const data = await response.json();
      setData(data.message);
    }

    getData();

  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{data}</Text>
    </View>
  );
}

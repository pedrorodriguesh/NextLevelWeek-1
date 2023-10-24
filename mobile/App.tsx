import { StatusBar, View } from "react-native";
import {} from "expo";

import Routes from "./src/routes";

import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Ubuntu_700Bold, useFonts } from "@expo-google-fonts/ubuntu";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </>
  );
}

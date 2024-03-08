import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return <Redirect href="/play" />;
}

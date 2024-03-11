import { Redirect } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";

export default function HomeScreen() {
  return (
    <RootSiblingParent>
      <Redirect href="/play" />
    </RootSiblingParent>
  );
}

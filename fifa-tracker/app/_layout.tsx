import { Stack } from "expo-router";
import AddPlayerToTeam from "./modals/addPlayerToTeamModal";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="modals/addPlayerToTeamModal"
        options={{ headerShown: false, presentation: "modal" }}
      />
       <Stack.Screen
        name="modals/managePlayers"
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack>
  );
}

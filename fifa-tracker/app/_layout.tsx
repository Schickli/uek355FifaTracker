import { Stack } from "expo-router";
import AddPlayerToTeam from "./modals/addPlayerToTeamModal";
import { createContext, useState } from "react";
import { Player } from "../utils/Player";

export const TeamsContext = createContext({
  teams: {
    "Team 1": [] as Player[],
    "Team 2": [] as Player[],
  },
  setTeams: (teams: { "Team 1": Player[]; "Team 2": Player[] }) => {},
  currentTeam: "Team 1" as "Team 1" | "Team 2",
  setCurrentTeam: (team: "Team 1" | "Team 2") => {},
});

export default function Layout() {
  const [teams, setTeams] = useState({
    "Team 1": [] as Player[],
    "Team 2": [] as Player[],
  });
  const [currentTeam, setCurrentTeam] = useState(
    "Team 1" as "Team 1" | "Team 2"
  );

  return (
    <TeamsContext.Provider
      value={{ teams, setTeams, currentTeam, setCurrentTeam }}
    >
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
    </TeamsContext.Provider>
  );
}

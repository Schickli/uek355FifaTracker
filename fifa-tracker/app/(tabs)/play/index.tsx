import { View, SafeAreaView, TouchableOpacity } from "react-native";
import Button from "../../components/Button";
import { colorPallet } from "../../../utils/ColorPallet";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import Result from "../../components/Result";
import TeamSelection from "../../components/TeamSelection";
import TabButton from "../../components/TabButton";
import GamesService from "../../../services/gamesService";
import { Game } from "../../../utils/Game";
import Toast from "react-native-root-toast";

export default function Play() {
  const [teamResult1, setTeamResult1] = useState(0);
  const [teamResult2, setTeamResult2] = useState(0);
  const [teams, setTeams] = useState({
    "Team 1": [
      { name: "Spieler 1" },
      { name: "Spieler 2" },
      { name: "Spieler 3" },
    ],
    "Team 2": [
      { name: "Spieler 6" },
      { name: "Spieler 5" },
      { name: "Spieler 4" },
    ],
  });

  const [currentTeam, setCurrentTeam] = useState(
    "Team 1" as "Team 1" | "Team 2"
  );

  function saveGame() {
    const gamesService = new GamesService();
    let game: Game = {
      members1: teams["Team 1"].map((player) => player.name),
      members2: teams["Team 2"].map((player) => player.name),
      score1: teamResult1,
      score2: teamResult2,
      date: new Date().toLocaleString(),
    };
    gamesService
      .addGame(game)
      .then(() => {
        let toast = Toast.show("Game saved.", {
          duration: Toast.durations.LONG,
        });
        clear();
      })
      .catch(() => {
        let toast = Toast.show("Request failed to send.", {
          duration: Toast.durations.LONG,
        });
      });
  }

  function clear() {
    setTeamResult1(0);
    setTeamResult2(0);

    setTeams({
      "Team 1": [],
      "Team 2": [],
    });
  }

  return (
    <SafeAreaView style={{ padding: 16 }}>
      <View
        style={{
          padding: 16,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TabButton
          tabs={["Team 1", "Team 2"]}
          setCurrentTab={setCurrentTeam}
          currentTab={currentTeam}
        />
        <Result
          currentTeam={currentTeam}
          team1={teamResult1}
          team2={teamResult2}
          setTeam2={setTeamResult2}
          setTeam1={setTeamResult1}
        />
        <TeamSelection
          currentTeam={currentTeam}
          teams={teams}
          setTeams={setTeams}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <TouchableOpacity style={{ marginRight: 8 }} onPress={clear}>
            <Ionicons name="close" size={30} color={colorPallet.secondary} />
          </TouchableOpacity>
          <Button type="primaryButton" onPress={saveGame} text="Save">
            <Ionicons name="save" size={24} color={colorPallet.onPrimary} />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

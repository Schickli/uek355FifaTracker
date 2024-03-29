import { View, SafeAreaView, TouchableOpacity } from "react-native";
import Button from "../../components/Button";
import { colorPallet } from "../../../utils/ColorPallet";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useContext, useState } from "react";
import Result from "../../components/Result";
import TeamSelection from "../../components/TeamSelection";
import TabButton from "../../components/TabButton";
import GamesService from "../../../services/gamesService";
import { Game } from "../../../utils/Game";
import Toast from "react-native-root-toast";
import { TeamsContext } from "../../_layout";

export default function Play() {
  const [teamResult1, setTeamResult1] = useState(0);
  const [teamResult2, setTeamResult2] = useState(0);
  let { teams, setTeams, currentTeam, setCurrentTeam } = useContext(TeamsContext);

  const gamesService = GamesService.instance;

  function saveGame() {
    if (teams["Team 1"].length === 0 || teams["Team 2"].length === 0) {
      let toast = Toast.show("Please select players for both teams.", {
        duration: Toast.durations.LONG,
      });
      return;
    }
    
    let game: Game = {
      members1: teams["Team 1"],
      members2: teams["Team 2"],
      score1: teamResult1,
      score2: teamResult2,
      date: new Date().toLocaleString(),
    };

    // generiere einen dummy game
    // let game: Game = {
    //   members1: [{full_name: "Maurin Schickli"} as Player],
    //   members2: [{full_name: "Cyrill Koller"} as Player],
    //   score1: 30,
    //   score2: 20,
    //   date: new Date().toLocaleString(),
    // };

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
        <TeamSelection />
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

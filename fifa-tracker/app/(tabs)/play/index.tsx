import { View, SafeAreaView } from "react-native";
import Button from "../../components/Button";
import { colorPallet } from "../../../utils/ColorPallet";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import Result from "../../components/Result";
import TeamSelection from "../../components/TeamSelection";
import TabButton from "../../components/TabButton";

export default function Play() {
  const [teamResult1, setTeamResult1] = useState(0);
  const [teamResult2, setTeamResult2] = useState(0);
  const [currentTeam, setCurrentTeam] = useState("Team 1" as "Team 1" | "Team 2");

  function saveGame() {
    console.log("Save game");
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
        <TabButton tabs={["Team 1", "Team 2"]} setCurrentTab={setCurrentTeam} currentTab={currentTeam}/>
        <Result currentTeam={currentTeam} team1={teamResult1} team2={teamResult2} setTeam2={setTeamResult2} setTeam1={setTeamResult1} />
        <TeamSelection currentTeam={currentTeam}/>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <View style={{ marginRight: 8 }}>
            <Ionicons name="close" size={30} color={colorPallet.secondary} />
          </View>
          <Button type="primaryButton" onPress={saveGame} text="Save">
            <Ionicons name="save" size={24} color={colorPallet.onPrimary} />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

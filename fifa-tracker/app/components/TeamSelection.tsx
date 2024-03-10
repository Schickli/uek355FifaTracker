import { View, Text, FlatList } from "react-native";
import { useFonts } from "expo-font";
import { colorPallet } from "./ColorPallet";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ListItem } from "./ListItem";
import { TabButton } from "./TabButton";

type TeamSelectionProps = {
  currentTeam: "Team 1" | "Team 2";
};

export function TeamSelection({ currentTeam} : TeamSelectionProps) {
  const [team1, setTeam1] = useState([
    { name: "Spieler 1" },
    { name: "Spieler 2" },
    { name: "Spieler 3" },
  ]);

  const [team2, setTeam2] = useState([
    { name: "Spieler 6" },
    { name: "Spieler 5" },
    { name: "Spieler 4" },
  ]);

  const [fontsLoaded] = useFonts({
    "Nohemi-Bold": require("../../assets/fonts/Nohemi-Bold.ttf"),
  });

function removePlayer(index: number) {
    if (currentTeam === "Team 1") {
        const newTeam1 = team1.filter((_, i) => i !== index);
        setTeam1(newTeam1);
    } else {
        const newTeam2 = team2.filter((_, i) => i !== index);
        setTeam2(newTeam2);
    }
}

  function addPlayer() {
    console.log("Add player");
  }

  return (
    <View style={{ width: "80%" }}>
      {(currentTeam === "Team 1" ? team1 : team2).map((team, index) => (
        <View
          key={index}
          style={{
            borderColor: colorPallet.outline,
            borderWidth: 1,
          }}
        >
          <View>
            <ListItem name={team.name} action={removePlayer} index={index}>
              <Ionicons name="trash" size={24} color={colorPallet.secondary} />
            </ListItem>
          </View>
          {index !== (currentTeam === "Team 2" ? team1 : team2).length - 1 && (
            <View
              style={{ height: 1, borderBottomColor: colorPallet.outline }}
            />
          )}
        </View>
      ))}
      <View
        style={{
          borderColor: colorPallet.outline,
          borderWidth: 1,
          borderRadius: 200,
          marginTop: 10,
        }}
      >
        <ListItem name="Add Player" action={addPlayer} index={0}>
          <Ionicons name="add" size={24} color={colorPallet.secondary} />
        </ListItem>
      </View>
    </View>
  );
}
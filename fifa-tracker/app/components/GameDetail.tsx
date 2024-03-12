import { Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { colorPallet } from "../../utils/ColorPallet";
import { useFonts } from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Player } from "../../utils/Player";
import GamesService from "../../services/gamesService";
import Toast from "react-native-root-toast";
import { TeamsContext } from "../_layout";

type Game = {
  id: string;
  date: string;
  score: string;
  team1: Player[];
  team2: Player[];
};

export default function GameDetail({ id, date, score, team1, team2 }: Game) {

  const gamesService = GamesService.instance;

  const [fontsLoaded] = useFonts({
    "Nohemi Bold": require("../../assets/fonts/Nohemi-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  function deleteGame() {
    gamesService
      .deleteGame(id)
      .then(() => {
        let toast = Toast.show("Game deleted.", {
          duration: Toast.durations.LONG,
        });
      })
      .catch(() => {
        let toast = Toast.show("Request failed to send.", {
          duration: Toast.durations.LONG,
        });
      });
  }

  return (
    <View
      style={{
        borderColor: colorPallet.outline,
        borderWidth: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderColor: colorPallet.outline,
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ fontSize: 16, marginRight: 16 }}>{date}</Text>
        <TouchableOpacity onPress={deleteGame}>
          <Ionicons name="trash" size={24} color={colorPallet.secondary} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        <View style={{ width: "30%" }}>
          {team1.map((player, index) => (
            <Text
              key={player.id + "team1"}
              style={{
                fontSize: 16,
                textAlign: "left",
                marginBottom: index !== team1.length - 1 ? 4 : 0,
              }}
            >
              {player.full_name}
            </Text>
          ))}
        </View>
        <Text style={{ fontFamily: "Nohemi Bold", fontSize: 32 }}>{score}</Text>
        <View style={{ width: "30%" }}>
          {team2.map((player, index) => (
            <Text
              key={player.id + "team2"}
              style={{
                fontSize: 16,
                textAlign: "right",
                marginBottom: index !== team2.length - 1 ? 4 : 0,
              }}
            >
              {player.full_name}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

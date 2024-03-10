import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colorPallet } from "../../utils/ColorPallet";
import { useFonts } from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";

type Game = {
  date: string;
  score: string;
  team1: string[];
  team2: string[];
};

export default function Game({ date, score, team1, team2 }: Game) {
  const [fontsLoaded] = useFonts({
    "Nohemi Bold": require("../../assets/fonts/Nohemi-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  function deleteGame() {
    console.log("Delete game");
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
              key={player}
              style={{
                fontSize: 16,
                textAlign: "left",
                marginBottom: index !== team1.length - 1 ? 4 : 0,
              }}
            >
              {player}
            </Text>
          ))}
        </View>
        <Text style={{ fontFamily: "Nohemi Bold", fontSize: 32 }}>{score}</Text>
        <View style={{ width: "30%" }}>
          {team2.map((player, index) => (
            <Text
              key={player}
              style={{
                fontSize: 16,
                textAlign: "right",
                marginBottom: index !== team2.length - 1 ? 4 : 0,
              }}
            >
              {player}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

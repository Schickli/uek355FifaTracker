import { View, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import { Button } from "../../components/Button";
import { colorPallet } from "../../components/ColorPallet";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Result } from "../../components/Result";

export default function Play() {
  const [teamResult1, setTeamResult1] = useState("");
  const [teamResult2, setTeamResult2] = useState("");

  const [fontsLoaded] = useFonts({
    "Nohemi-Bold": require("../../../assets/fonts/Nohemi-Bold.ttf"),
  });

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
        <Result team1={setTeamResult1} team2={setTeamResult2} />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
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

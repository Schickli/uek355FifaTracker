import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import { colorPallet } from "./ColorPallet";
import { Button } from "./Button";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

type Resultprops = {
  setTeam1: SetStateType;
  setTeam2: SetStateType;
  team1: number;
  team2: number;
  currentTeam: "Team 1" | "Team 2";
};

type SetStateType = React.Dispatch<React.SetStateAction<any>>;

export function Result(props: Resultprops) {
  const [fontsLoaded, fontError] = useFonts({
    "Nohemi Bold": require("../../assets/fonts/Nohemi-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handlePlus = () => {
    if (props.currentTeam === "Team 1") {
      props.setTeam1((prevScore: number) => Math.min(prevScore + 1, 99));
    } else {
      props.setTeam2((prevScore: number) => Math.min(prevScore + 1, 99));
    }
  };

  const handleMinus = () => {
    if (props.currentTeam === "Team 1") {
      props.setTeam1((prevScore: number) => Math.max(prevScore - 1, 0));
    } else {
      props.setTeam2((prevScore: number) => Math.max(prevScore - 1, 0));
    }
  };

  return (
    <View style={{ marginTop: 32, display: "flex", justifyContent: "center", width: "100%" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text
          style={[
            styles.numbers,
            {
              color:
                props.currentTeam === "Team 1"
                  ? colorPallet.primary
                  : colorPallet.text,
              width: 150,
            },
          ]}
        >
          {props.team1}
        </Text>
        <Text style={styles.numbers}>:</Text>
        <Text
          style={[
            styles.numbers,
            {
              color:
                props.currentTeam === "Team 2"
                  ? colorPallet.primary
                  : colorPallet.text,
              width: 150,
            },
          ]}
        >
          {props.team2}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 16,
          marginBottom: 32,
   
        }}
      >
        <Button type="primaryButton" onPress={handleMinus}>
          <Ionicons name="remove" size={30} color={colorPallet.onPrimary} />
        </Button>

        <Button type="primaryButton" onPress={handlePlus}>
          <Ionicons name="add" size={30} color={colorPallet.onPrimary} />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  numbers: {
    fontSize: 120,
    textAlign: "center",
    fontFamily: "Nohemi Bold",
  },
});

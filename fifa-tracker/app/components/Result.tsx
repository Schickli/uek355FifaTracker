import { View, Text, TextInput, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import { colorPallet } from "./ColorPallet";
import { Button } from "./Button";
import { Ionicons } from "@expo/vector-icons";

type Resultprops = {
  setTeam1: SetStateType;
  setTeam2: SetStateType;
  team1: number;
  team2: number;
  currentTeam: "Team 1" | "Team 2";
};

type SetStateType = React.Dispatch<React.SetStateAction<any>>;

export function Result(props: Resultprops) {
  const handlePlus = () => {
    if (props.currentTeam === "Team 1") {
      props.setTeam1((prevScore: number) => prevScore + 1);
    } else {
      props.setTeam2((prevScore: number) => prevScore + 1);
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
    <View style={{marginTop: 32}}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
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
          justifyContent: "space-between",
          marginTop: 16,
          marginBottom: 32,
          width: "40%",
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
    fontSize: 96,
  },
});

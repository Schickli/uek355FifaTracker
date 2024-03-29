import { TouchableOpacity, View } from "react-native";
import { colorPallet } from "../../utils/ColorPallet";
import React, { useState, useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import ListItem from "./ListItem";
import { Link } from "expo-router";
import { Player } from "../../utils/Player";
import { TeamsContext } from "../_layout";

export default function TeamSelection() {
  let { currentTeam, teams, setTeams } = useContext(TeamsContext);

  function removePlayer(index: number) {
    const newTeams = { ...teams };
    newTeams[currentTeam] = newTeams[currentTeam].filter((_, i) => i !== index);
    setTeams(newTeams);
  }

  return (
    <View style={{ width: "80%" }}>
      {teams[currentTeam].map((player, index) => (
        <View
          key={index}
          style={{
            borderColor: colorPallet.outline,
            borderWidth: 1,
          }}
        >
          <View>
            <ListItem
              name={player.full_name}
              action={removePlayer}
              index={index}
            >
              <Ionicons name="remove-circle-outline" size={24} color={colorPallet.secondary} />
            </ListItem>
          </View>
          {index !== teams[currentTeam].length - 1 && (
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
        <Link href="modals/addPlayerToTeamModal" asChild>
          <TouchableOpacity>
            <ListItem name="Add Player" index={0}>
              <Ionicons name="add-circle-outline" size={24} color={colorPallet.secondary} />
            </ListItem>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

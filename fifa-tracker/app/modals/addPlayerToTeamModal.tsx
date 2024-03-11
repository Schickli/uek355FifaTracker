import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import SearchBar from "../components/SearchBar";
import { colorPallet } from "../../utils/ColorPallet";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TeamsContext } from "../_layout";

export default function AddPlayerToTeam() {
const [search, setSearch] = useState("");
const params = useLocalSearchParams();
console.log(params);

const { currentTeam, teams, setTeams } = useContext(TeamsContext);

  return (
      <TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.title}>{currentTeam}</Text>
          <Text style={styles.subtitle}>Add players to Team</Text>
          <SearchBar setValue={setSearch}>
            <TouchableOpacity>
              <Ionicons name="add" size={30} color={colorPallet.secondary} />
            </TouchableOpacity>
          </SearchBar>
        </View>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f3f3",
    marginTop: 26,
    marginHorizontal: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    color: colorPallet.text,
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Nohemi Bold",
  },
  subtitle: {
    color: colorPallet.text,
    fontSize: 16,
    marginTop: 8,
    marginBottom: 24,
    fontWeight: "bold",
  },
  flatlist: {
    marginVertical: 24,
    borderColor: colorPallet.outline,
    borderWidth: 1,
  },
  noPlayersContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  noPlayers: {
    color: colorPallet.outline,
    fontSize: 16,
  },
});

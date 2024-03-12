import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import SearchBar from "../components/SearchBar";
import { colorPallet } from "../../utils/ColorPallet";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TeamsContext } from "../_layout";
import ListItem from "../components/ListItem";
import { Player } from "../../utils/Player";
import PlayersService from "../../services/playersService";

export default function AddPlayerToTeam() {
  const [search, setSearch] = useState("");
  const [uncheckedPlayers, setUncheckedPlayers] = useState([] as Player[]);
  const { currentTeam, teams, setTeams, setCurrentTeam } =
    useContext(TeamsContext);

  useEffect(() => {
    fetchData();
  }, [teams[currentTeam]]);

  const playersService = PlayersService.instance;

  async function fetchData() {
    const unchecked = (await playersService.getPlayers()).filter((player) => {
      return !teams[currentTeam].find(
        (teamPlayer) => teamPlayer.id === player.id
      );
    });
    setUncheckedPlayers(unchecked);
  }

  function addToTeam(index: number): void {
    const newTeams = { ...teams };

    newTeams[currentTeam].push(uncheckedPlayers[index]);
    setTeams(newTeams);
    setUncheckedPlayers(uncheckedPlayers.filter((_, i) => i !== index));
  }

  function removeFromTeam(index: number): void {
    const newTeams = { ...teams };
    newTeams[currentTeam] = newTeams[currentTeam].filter((_, i) => i !== index);
    setTeams(newTeams);
    fetchData();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentTeam}</Text>
      <Text style={styles.subtitle}>Add players to Team</Text>
      {teams[currentTeam].length === 0 ? (
        <View style={styles.noPlayersContainer}>
          <Text style={styles.noPlayers}>No players selected.</Text>
        </View>
      ) : (
        <FlatList
          data={teams[currentTeam]}
          renderItem={({ item, index }) => (
            <ListItem
              name={item.full_name}
              index={index}
              action={removeFromTeam}
              textColor={colorPallet.onPrimary}
              style={{
                borderColor: colorPallet.outline,
                borderWidth: 0.5,
                backgroundColor: colorPallet.primary,
              }}
            >
              <Ionicons
                name="remove-circle-outline"
                color={colorPallet.onPrimary}
                size={32}
              />
            </ListItem>
          )}
          keyExtractor={(item) => item.id?.toString() ?? "0"}
          style={styles.flatlist}
        />
      )}
      {uncheckedPlayers.length === 0 ? (
        <View style={styles.noPlayersContainer}>
          <Text style={styles.noPlayers}>No players anymore/yet</Text>
        </View>
      ) : (
        <FlatList
          data={uncheckedPlayers}
          renderItem={({ item, index }) => (
            <ListItem
              name={item.full_name}
              index={index}
              action={addToTeam}
              style={{
                borderColor: colorPallet.outline,
                borderWidth: 0.5,
              }}
            >
              <Ionicons
                name="add-circle-outline"
                color={colorPallet.secondary}
                size={32}
              />
            </ListItem>
          )}
          keyExtractor={(item) => item.id?.toString() ?? "0"}
          style={styles.flatlist}
        />
      )}
    </View>
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
    borderWidth: 0.5,
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
    height: 24,
  },
});

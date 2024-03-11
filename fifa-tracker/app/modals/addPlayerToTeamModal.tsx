import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
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
  const { currentTeam, teams, setTeams, setCurrentTeam } = useContext(TeamsContext);

  async function fetchData() {
    const playersService = new PlayersService();
    const unchecked = (await playersService.getPlayers()).filter((player) => {
        return !teams[currentTeam].find((teamPlayer) => teamPlayer.id === player.id);
    });
    setUncheckedPlayers(unchecked);
  }

  useEffect(() => {
    fetchData();
  }, [teams[currentTeam]]);


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
    <TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>{currentTeam}</Text>
        <Text style={styles.subtitle}>Add players to Team</Text>
        <SearchBar setValue={setSearch}>
          <TouchableOpacity>
            <Ionicons name="search" size={30} color={colorPallet.secondary} />
          </TouchableOpacity>
        </SearchBar>
        <FlatList
          data={teams[currentTeam]}
          renderItem={({ item }) => (
            <ListItem name={item.full_name} index={item.id ?? 0} action={removeFromTeam}>
              <Ionicons
                name="checkmark-done"
                color={colorPallet.secondary}
                size={24}
              />
            </ListItem>
          )}
          keyExtractor={(item) => item.id?.toString() ?? "0"}
          style={styles.flatlistChecked}
        />
        <FlatList
          data={uncheckedPlayers}
        renderItem={({ item }) => (
            <ListItem
                name={item.full_name}
                index={item.id ?? 0}
                action={addToTeam}
            >
                <Ionicons
                    name="add-circle-outline"
                    color={colorPallet.secondary}
                    size={24}
                />
            </ListItem>
        )}
          keyExtractor={(item) => item.id?.toString() ?? "0"}
          style={styles.flatListUnchecked}
        />
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
  flatlistChecked: {
    marginVertical: 24,
    borderColor: colorPallet.outline,
    borderWidth: 1,
  },
  flatListUnchecked: {
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

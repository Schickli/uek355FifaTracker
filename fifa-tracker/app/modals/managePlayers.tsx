import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { colorPallet } from "../../utils/ColorPallet";
import { useFonts } from "expo-font";
import SearchBar from "../components/SearchBar";
import ListItem from "../components/ListItem";
import PlayersService from "../../services/playersService";
import { Player } from "../../utils/Player";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Manageplayers() {
  const [fontsLoaded] = useFonts({
    "Nohemi Bold": require("../../assets/fonts/Nohemi-Bold.ttf"),
  });
  const [players, setPlayers] = useState([] as Player[]);
  const [filteredPlayers, setFilteredPlayers] = useState([] as Player[]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const playerservice = new PlayersService();
    playerservice.getPlayers().then((data) => {
      setPlayers(data);
      setFilteredPlayers(data);
    });
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredPlayers(players);
      return;
    }
    let playerSearch = players.filter((player) =>
      player.full_name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPlayers(playerSearch);
  }, [search]);

  function deletePlayer(id: number) {
    const playerservice = new PlayersService();
    playerservice.deletePlayer(id).then(() => {
      const newPlayers = players.filter((player) => player.id !== id);
      setPlayers(newPlayers);
    });
  }

  function addPlayer() {
    const playerservice = new PlayersService();
    const newPlayer = {
      full_name: search,
      wins: 0,
      losses: 0,
      draws: 0,
    } as Player;
    playerservice.addPlayer(newPlayer).then((data) => {
      playerservice.getPlayers().then((data) => {
        setPlayers(data);
        setFilteredPlayers(data);
      });
    });
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Players</Text>
      <Text style={styles.subtitle}>Search or Add players</Text>
      <SearchBar setValue={setSearch}>
        <TouchableOpacity onPress={() => addPlayer()}>
          <Ionicons name="add" size={30} color={colorPallet.secondary} />
        </TouchableOpacity>
      </SearchBar>
      {filteredPlayers.length === 0 ? (
        <View style={styles.noPlayersContainer}>
          <Text style={styles.noPlayers}>No players found.</Text>
          <Text style={[styles.noPlayers, {marginTop: 4}]}>Change search or add new player.</Text>
          </View>
      ) : (
        <FlatList
          data={filteredPlayers}
          renderItem={({ item }) => (
            <ListItem
              name={item.full_name}
              index={item.id ?? 0}
              action={deletePlayer}
            >
              <Ionicons name="trash" color={colorPallet.secondary} size={24} />
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

import { View, Text } from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from "expo-router";
import Toast from "react-native-root-toast";
import GamesService from "../../../services/gamesService";
import { Game } from "../../../utils/Game";
import GameDetail from "../../components/GameDetail";
import { FlatList } from "react-native";
import { colorPallet } from "../../../utils/ColorPallet";

export default function History() {
  const [games, setGames] = useState({} as Game[]);
  const [isFetching, setIsFetching] = useState(false);
  const gamesService = GamesService.instance;

  async function updateGames() {
    setIsFetching(true);
    await gamesService
      .getGames()
      .then((games: Game[]) => {
        setGames(games);
      })
      .catch((error) => {
        let toast = Toast.show("Request failed to send.", {
          duration: Toast.durations.LONG,
        });
      });
    setIsFetching(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      updateGames();
    }, [])
  );

  return (
    <View style={{ padding: 16 }}>
      {games.length === 0 ? (
        <Text
          style={{
            width: "100%",
            color: colorPallet.outline,
            textAlign: "center",
            marginTop: 16,
          }}
        >
          No games yet.
        </Text>
      ) : (
        <FlatList
          style={{ width: "100%", height: "100%" }}
          data={games}
          onRefresh={updateGames}
          refreshing={isFetching}
          keyExtractor={(item) => item.id?.toString() || ""}
          renderItem={({ item }) => (
            <View style={{ marginTop: 24 }}>
              <GameDetail
                id={item.id?.toString() || ""}
                date={item.date.toLocaleString()}
                score={item.score1 + " - " + item.score2}
                team1={item.members1}
                team2={item.members2}
                updateGames={updateGames}
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

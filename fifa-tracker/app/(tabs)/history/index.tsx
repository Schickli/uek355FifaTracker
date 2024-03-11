import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Toast from "react-native-root-toast";
import GamesService from "../../../services/gamesService";
import { Game } from "../../../utils/Game";
import GameDetail from "../../components/GameDetail";
import { FlatList } from "react-native";
import { colorPallet } from "../../../utils/ColorPallet";

export default function History() {
  const [games, setGames] = useState({} as Game[]);

  useEffect(() => {
    const gamesService = new GamesService();
    gamesService
      .getGames()
      .then((games: Game[]) => {
        setGames(games);;
      })
      .catch((error) => {
        let toast = Toast.show("Request failed to send.", {
          duration: Toast.durations.LONG,
        });
      });
  }, []);

  return (
    <View style={{ padding: 16 }}>
      {games.length === 0 ? (
        <Text style={{width: "100%", color: colorPallet.outline}}>No games yet.</Text>
      ) : (
        <FlatList
          data={games}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginTop: 24 }}>
              <GameDetail
                date={item.date.toLocaleString()}
                score={item.score1 + " - " + item.score2}
                team1={item.members1}
                team2={item.members2}
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import PlayersService from "../../../services/playersService";
import { Player } from "../../../utils/player";
import { StatsContainer } from "../../components/StatsContainer";
import { colorPallet } from "../../components/ColorPallet";

export default function Statistics() {
  const [players, setPlayers] = useState([] as Player[]);

  useEffect(() => {
    const playersService = new PlayersService();
    playersService.getPlayers().then((players) => {
      setPlayers(players);
    });
  }, []);
  return (
    <View>
      <Text>Play</Text>
      {players.map((player) => (
        <Text key={player.full_name}>{player.full_name}</Text>
      ))}
      <StatsContainer
        headLine="256 Games"
        subTitle="Total Games"
        backgroundColor={colorPallet.primary}
      />
    </View>
  );
}

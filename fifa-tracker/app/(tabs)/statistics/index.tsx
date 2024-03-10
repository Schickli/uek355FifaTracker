import { View } from "react-native";
import React, { useEffect, useState } from "react";
import PlayersService from "../../../services/playersService";
import { Player } from "../../../utils/Player";
import StatsContainer from "../../components/StatsContainer";
import { colorPallet } from "../../../utils/ColorPallet";

export default function Statistics() {
  const [players, setPlayers] = useState([] as Player[]);

  useEffect(() => {
    const playersService = new PlayersService();
    playersService.getPlayers().then((players) => {
      setPlayers(players);
    });
  }, []);

  return (
    <View style={{ padding: 16 }}>
      {/* <Text>Play</Text>
      {players.map((player) => (
        <Text key={player.full_name}>{player.full_name}</Text>
      ))} */}
      <StatsContainer
        headLine="256 Games"
        subTitle="Total Games"
        color={colorPallet.onPrimary}
        backgroundColor={colorPallet.primary}
      />
      <StatsContainer
        headLine="Cyrill Koller"
        subTitle="Best Player"
        color={colorPallet.text}
        backgroundColor={colorPallet.transparent}
      />
      <StatsContainer
        headLine="652 Goals"
        subTitle="T2.61 Average per Game"
        color={colorPallet.onPrimary}
        backgroundColor={colorPallet.primary}
      />
    </View>
  );
}

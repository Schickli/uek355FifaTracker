import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

import PlayersService from '../../../services/playersService';
import { Player } from '../../../utils/player';

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
      </View>
    );
}

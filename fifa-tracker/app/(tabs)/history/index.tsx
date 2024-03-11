import { View } from "react-native";
import React from "react";
import SearchBar from "../../components/SearchBar";
import Game from "../../components/Game";

export default function History() {

  return (
    <View style={{ padding: 16 }}>
      {/* <SearchBar /> */}
      <View style={{ marginTop: 24 }}>
        <Game
          date={new Date().toLocaleString()}
          score="3:2"
          team1={["Maurin", "Cyrill", "Toni"]}
          team2={["Mustafani", "Seppi"]}
        />
      </View>
    </View>
  );
}

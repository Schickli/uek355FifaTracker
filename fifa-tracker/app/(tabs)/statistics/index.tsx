import { View } from "react-native";
import React, { useEffect, useState } from "react";
import StatsService from "../../../services/statsService";
import { Player } from "../../../utils/Player";
import StatsContainer from "../../components/StatsContainer";
import { colorPallet } from "../../../utils/ColorPallet";
import { AllStatistics } from "../../../utils/AllStatistics";

export default function Statistics() {
  const [stats, setStats] = useState({} as AllStatistics);

  useEffect(() => {
    const statsService = new StatsService();
    statsService.getStats().then((stats: AllStatistics) => {
      console.log(stats);
      setStats(stats);
    });
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <StatsContainer
        headLine={stats.allGoals?.toString() + " Goals" || "0 Goals"}
        subTitle={
          stats.averageGoalsPerGame?.toString() + " Avg Goals per Game" ||
          "0 Avg Goals per Game"
        }
        color={colorPallet.onPrimary}
        backgroundColor={colorPallet.primary}
      />
      <StatsContainer
        headLine={stats.mostWinsPlayer || "No Player's yet"}
        subTitle="Most Wins Player"
        color={colorPallet.text}
        backgroundColor={colorPallet.transparent}
      />
      <StatsContainer
        headLine={stats.allGames?.toString() + " Games" || "0 Games"}
        subTitle={"Total Games"}
        color={colorPallet.onPrimary}
        backgroundColor={colorPallet.primary}
      />
    </View>
  );
}

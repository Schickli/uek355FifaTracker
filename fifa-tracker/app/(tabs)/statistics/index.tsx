import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import StatsService from "../../../services/statsService";
import StatsContainer from "../../components/StatsContainer";
import { colorPallet } from "../../../utils/ColorPallet";
import { AllStatistics } from "../../../utils/AllStatistics";
import Toast from "react-native-root-toast";
import Button from "../../components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Statistics() {
  const [stats, setStats] = useState({} as AllStatistics);
  const [loading, setLoading] = useState(true);
  const statsService = StatsService.instance;

  useFocusEffect(
    React.useCallback(() => {
      getStats();
    }, [])
  );

  function getStats() {
    setLoading(true);
    statsService
      .getStats()
      .then((stats: AllStatistics) => {
        setStats(stats);
        setLoading(false);
      })
      .catch((error) => {
        let toast = Toast.show("Request failed to send.", {
          duration: Toast.durations.LONG,
        });
        setLoading(false);
      });
  }

  return (
    <View style={{ padding: 16 }}>
      {loading ? (
        <Text style={{ alignSelf: "center", marginTop: 16 }}>
          Loading Statistics for you.
        </Text>
      ) : (
        <>
          <StatsContainer
            headLine={stats.allGoals?.toString() + " Goals" || "0 Goals"}
            subTitle={
              stats.averageGoalsPerGame?.toFixed(2) +
                " Average Goals per Game" || "0 Average Goals per Game"
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
          <Button
            style={{ alignSelf: "center", marginTop: 16 }}
            onPress={() => {
              getStats();
            }}
          >
            <Ionicons name="refresh" size={24} color={colorPallet.primary} />
          </Button>
        </>
      )}
    </View>
  );
}

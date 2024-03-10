import { Text, View } from "react-native";
import React from "react";
import { colorPallet } from "./ColorPallet";
import { useFonts } from "expo-font";

type TeamSelectionProps = {
  headLine: string;
  subTitle: string;
  backgroundColor: string;
  color: string;
};

export function StatsContainer({
  headLine,
  subTitle,
  backgroundColor,
  color,
}: TeamSelectionProps) {
  const [fontsLoaded] = useFonts({
    "Nohemi Bold": require("../../assets/fonts/Nohemi-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ backgroundColor: backgroundColor, paddingHorizontal: 26, paddingVertical: 16, borderRadius: 5}}>
      <Text style={{ fontFamily: "Nohemi Bold", fontSize: 32, color: color }}>
        {headLine}
      </Text>
      <Text style={{ color: color, marginTop: 4 }}>{subTitle}</Text>
    </View>
  );
}

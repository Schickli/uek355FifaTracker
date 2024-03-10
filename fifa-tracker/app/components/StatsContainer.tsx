import { Text, View } from "react-native";
import React from "react";
import { colorPallet } from "./ColorPallet";
import { useFonts } from "expo-font";


type TeamSelectionProps = {
   headLine: string;
   subTitle: string;
   backgroundColor: string;
};

export default function StatsContainer({ headLine, subTitle, backgroundColor }: TeamSelectionProps) {
  const [fontsLoaded] = useFonts({
    "Nohemi Bold": require("../../assets/fonts/Nohemi-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{backgroundColor: backgroundColor}}>
      <Text style={{fontFamily: "Nahomi Bold", fontSize: 32}}>{headLine}</Text>
      <Text>{subTitle}</Text>
    </View>
  );
}

import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { colorPallet } from "./ColorPallet";
import { Button } from "./Button";
import Ionicons from "@expo/vector-icons/Ionicons";

type HeaderProps = {
  title: string;
};

export const CustomHeader: React.FC<HeaderProps> = ({ title }) => {
  const [fontsLoaded] = useFonts({
    "Nohemi-Bold": require("../../assets/fonts/Nohemi-Bold.ttf"),
  });

  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Button type="primaryButton" onPress={() => {}}>
        <Ionicons name="person" size={30} color={colorPallet.onPrimary} />
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f3f3f3",
    marginTop: 70,
    marginLeft: 16,
    marginRight: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: colorPallet.text,
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Nohemi-Bold",
  },
});

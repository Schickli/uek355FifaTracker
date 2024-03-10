import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { colorPallet } from "./ColorPallet";
import { Button } from "./Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { Link, router } from "expo-router";

type HeaderProps = {
  title: string;
};

export function CustomHeader({ title }: HeaderProps) {
  const [fontsLoaded] = useFonts({
    "Nohemi Bold": require("../../assets/fonts/Nohemi-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Link href="modals/managePlayers" asChild>
        <Button type="tertiaryButton">
          <Ionicons name="person" size={30} color={colorPallet.primary} />
        </Button>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f3f3f3",
    marginTop: 70,
    marginLeft: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: colorPallet.text,
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Nohemi Bold",
  },
});

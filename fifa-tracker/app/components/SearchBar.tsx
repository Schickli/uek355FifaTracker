import { View, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colorPallet } from "./ColorPallet";

export function SearchBar() {
  return (
    <View style={styles.SearchBar}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Search..."
        placeholderTextColor={colorPallet.primaryLight}
      />
      <Ionicons name="search" size={30} color={colorPallet.secondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  SearchBar: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colorPallet.outline,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 200,
  },
  inputStyle: {
    flex: 1,
  },
});

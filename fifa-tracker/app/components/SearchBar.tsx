import { View, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colorPallet } from "../../utils/ColorPallet";

type SearchProps = {
  children?: React.ReactNode;
  setValue: (value: string) => void;
  value?: string;
};

export default function SearchBar({ children, setValue }: SearchProps) {
  return (
    <View style={styles.SearchBar}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Search..."
        placeholderTextColor={colorPallet.primaryLight}
        onChangeText={(text) => {
          setValue(text);
        }}
      />
      {children}
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

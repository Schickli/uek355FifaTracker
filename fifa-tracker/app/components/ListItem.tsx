import React, { Children } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";


interface ListItemProps {
  name: string;
  action: (index: number) => void;
  index: number;
  children: React.ReactNode;
}

export function ListItem({ name, action, index, children }: ListItemProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 16,
        paddingLeft: 16,
        paddingTop: 8,
        paddingBottom: 8
      }}
    >
      <Text style={{ fontSize: 12 }}>{name}</Text>
      <TouchableOpacity onPress={() => action(index)}>
        {children}
      </TouchableOpacity>
    </View>
  );
}

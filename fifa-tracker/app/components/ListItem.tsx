import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type ListItemProps = {
  name: string;
  action?: (index: string) => void;
  index: string;
  children: React.ReactNode;
}

export default function ListItem({ name, action, index, children }: ListItemProps) {
  return (
    <View
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 16,
        paddingLeft: 16,
        paddingTop: 8,
        paddingBottom: 8,
      }}
    >
      <Text style={{ fontSize: 12 }}>{name}</Text>
      {action ? (
        <TouchableOpacity onPress={() => action && action(index)}>
          {children}
        </TouchableOpacity>
      ) : (
        children
      )}
    </View>
  );
}

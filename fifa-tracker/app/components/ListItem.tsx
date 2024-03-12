import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { colorPallet } from "../../utils/ColorPallet";

type ListItemProps = {
  name: string;
  action?: (index: number) => void;
  index: number;
  children: React.ReactNode;
  style?: any;
  textColor?: string;
};

export default function ListItem({
  style,
  name,
  action,
  index,
  children,
  textColor,
}: ListItemProps) {

  return (
    <View
      style={[{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 16,
        paddingLeft: 16,
        paddingTop: 8,
        paddingBottom: 8,
      }, style]}
    >
      <Text style={{ fontSize: 14, color: textColor }}>{name}</Text>
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

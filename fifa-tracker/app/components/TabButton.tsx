import { View, Text, TouchableOpacity } from "react-native";
import { colorPallet } from "../../utils/ColorPallet";
import React from "react";

type TabButtonProps = {
  tabs: string[];
  setCurrentTab: any;
  currentTab: string;
};

export default function TabButton({
  tabs,
  setCurrentTab,
  currentTab,
}: TabButtonProps) {
  const tabWidth = 100 / tabs.length;

  return (
    <View style={{ width: "100%" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          borderColor: colorPallet.primary,
          borderWidth: 1,
          borderRadius: 200,
        }}
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                currentTab === tab ? colorPallet.primaryLight : "transparent",
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 200,
            }}
            onPress={() => setCurrentTab(tab)}
          >
            <Text
              style={{
                fontSize: 24,
                color: colorPallet.text,
              }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CustomHeader } from "../components/CustomHeader";
import { colorPallet } from "../../utils/ColorPallet";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <CustomHeader title="Fifa Tracker" />,
        tabBarStyle: {
          height: 100,
          paddingVertical: 8,
          elevation: 8,
          shadowColor: colorPallet.primary,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.35,
          shadowRadius: 3.84,
        },
      }}
    >
      <Tabs.Screen
        name="statistics/index"
        options={{
          title: "Stats",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={28}
              style={{ marginBottom: -3 }}
              name="stats-chart"
              color={focused ? colorPallet.primary : colorPallet.primaryLight}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="play/index"
        options={{
          title: "Play",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={28}
              style={{ marginBottom: -3 }}
              name="add-outline"
              color={focused ? colorPallet.primary : colorPallet.primaryLight}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history/index"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={28}
              style={{ marginBottom: -3 }}
              name="list"
              color={focused ? colorPallet.primary : colorPallet.primaryLight}
            />
          ),
        }}
      />
    </Tabs>
  );
}

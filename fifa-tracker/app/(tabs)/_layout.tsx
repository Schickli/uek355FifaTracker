import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="statistics/index"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => (
            <Ionicons
              size={28}
              style={{ marginBottom: -3 }}
              name="stats-chart"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="play/index"
        options={{
          title: "Play",
          tabBarIcon: ({ color }) => (
            <Ionicons
              size={28}
              style={{ marginBottom: -3 }}
              name="add-outline"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history/index"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <Ionicons
              size={28}
              style={{ marginBottom: -3 }}
              name="list"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

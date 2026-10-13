import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function RecrutadorLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#070707",
          borderTopColor: "#242424",
          height: 60,
          paddingTop: 6,
          paddingBottom: 6,
        },
        tabBarActiveTintColor: "#8E53F4",
        tabBarInactiveTintColor: "#666666",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Descobrir",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cards-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="lista"
        options={{
          title: "Lista",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

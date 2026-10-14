import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RecruitmentProvider } from "../contexts/recruitment-context";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RecruitmentProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="dev-cadastro" />
          <Stack.Screen name="recrutador" />
        </Stack>
      </RecruitmentProvider>
    </GestureHandlerRootView>
  );
}
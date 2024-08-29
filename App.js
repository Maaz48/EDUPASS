import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
const Stack = createNativeStackNavigator();
import Toast from "react-native-toast-message";
export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="login"
          >
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="signup" component={Signup} />
          </Stack.Navigator>
          <Toast />
        </SafeAreaView>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

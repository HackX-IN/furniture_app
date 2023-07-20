import {
  Alert,
  BackHandler,
  LogBox,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Bottom from "./src/Navigation/Navigation";
import ProductPage from "./src/Screens/ProductPage";
import Cart from "./src/Screens/Cart";
import { useEffect } from "react";

import axios from "axios";
import Arrivals from "./src/Screens/Arrivals";
import LoginScreen from "./src/Screens/Login";
import Register from "./src/Screens/Register";
import { UserContextProvider } from "./src/Hooks/userContext";
import Toast from "react-native-toast-message";
import Favorite from "./src/Screens/Favorite";


const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    LogBox.ignoreAllLogs();
    // Add the back handler listener when the component mounts
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    // Clean up the back handler listener when the component unmounts
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  const handleBackPress = () => {
    // Show an alert to confirm if the user wants to exit the app
    Alert.alert(
      "Confirm Exit",
      "Are you sure you want to exit the app?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Ok", onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );

    return true; // Return true to prevent default behavior (app closing)
  };

  return (
    <NavigationContainer>
     
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="bottom"
            component={Bottom}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Product"
            component={ProductPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Rivals"
            component={Arrivals}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Fav"
            component={Favorite}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <Toast ref={(ref) => Toast.setRef(ref)} />
     
    </NavigationContainer>
  );
}

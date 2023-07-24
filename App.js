import {
  Alert,
  BackHandler,
  LogBox,
  StyleSheet,
  Text,
  View,
  Platform,
  PermissionsAndroid
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Bottom from "./src/Navigation/Navigation";
import ProductPage from "./src/Screens/ProductPage";
import Cart from "./src/Screens/Cart";
import { useEffect } from "react";
import Arrivals from "./src/Screens/Arrivals";
import LoginScreen from "./src/Screens/Login";
import Register from "./src/Screens/Register";
import { CartProvider } from "./src/Hooks/userContext";
import Toast from "react-native-toast-message";
import Favorite from "./src/Screens/Favorite";

import OrderPage from "./src/Screens/OrderPage";
import HelpPage from "./src/Screens/Helps";
import {requestUserPermission,notificationListeners} from './src/utils/notificationServices'




const Stack = createNativeStackNavigator();


export default function App() {

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
        .then((res) => {
          console.log("Permission result:", res);

          if (!!res && res === 'never_ask_again') {
            console.log('Notification permission denied with "never_ask_again"');
            requestUserPermission();
            notificationListeners();
            // You can show a custom message or redirect the user to settings to enable the permission manually
          } else if (!!res && res === 'granted') {
            console.log('Notification permission granted.');
            // If permission is granted, call functions to handle notification services
            requestUserPermission();
            notificationListeners();
          } else {
            console.log('Notification permission denied.');
            // You can handle the case where the permission is denied without "never_ask_again"
          }
        })
        .catch((error) => {
          console.log('Error while requesting permission:', error);
        });
    } else {
      // Handle permissions for other platforms if needed
    }
  }, []);




  useEffect(() => {
    LogBox.ignoreAllLogs();

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  const handleBackPress = () => {
   
    Alert.alert(
      "Confirm Exit",
      "Are you sure you want to exit the app?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Ok", onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );

    return true; 
  };

  return (
    <NavigationContainer>
      
        <CartProvider>
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
            <Stack.Screen
              name="Help"
              component={HelpPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Order"
              component={OrderPage}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </CartProvider>
    
    </NavigationContainer>
  );
}

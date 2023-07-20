import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/FontAwesome";
import { Feather } from "@expo/vector-icons";
import { Colors, Sizes } from "../Assets/index";
import SearchComp from "../Components/SearchComp";
import Swiper from "../Components/Swiper";
import Showcard from "../Components/Showcard";
import { useCart } from "../Hooks/userContext";

import * as Location from 'expo-location';
import { useEffect } from "react";
import { useState } from "react";

const HomeScreen = ({ navigation }) => {
  const { cartState } = useCart();
  const cartLength = cartState.cartItems.length;

  const [errorMsg, setErrorMsg] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [loading, setLoading] = useState(true);


  const getLocationName = async () => {
    try {
      const { coords } = {"coords": {"accuracy": 100, "altitude": 0, "altitudeAccuracy": 0, "heading": 0, "latitude": 12.7940085, "longitude": 78.7156668, "speed": 0}, "mocked": false, "timestamp": 1689874218336};
  
      const location = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
     
      if (location && location.length > 0) {
        const { city, region } = location[0];
        const locationName = `${city}, ${region}`; // Combine city and region
        setLocationName(locationName);
        setLoading(false);
      } else {
        setLocationName("Location not found");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to get location name.");
    }
  };
  
  
  useEffect(() => {
    getLocationName();
  }, []);

 

  const colorScheme = useColorScheme();
  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colorScheme === "dark" ? "#0C1C2C" : "white"}
      />
      <View
        style={{
          marginTop: Platform.OS === "android" ? 10 : undefined,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 15,
          backgroundColor: Colors.white,
        }}
      >
        <Icon name="map-pin" size={Sizes["2xl"]} color={Colors.green} />
        {loading ? (
          <ActivityIndicator color="green" size="small" />
        ) : (<Text style={{ fontSize: Sizes.xl, fontWeight: "bold" }}>

        {locationName}
        </Text>)}
        
        <View
          style={{
            position: "absolute",
            top: 5,
            right: 8,
            width: Sizes.lg,
            height: Sizes.lg,
            borderRadius: Sizes.md / 2,
            backgroundColor: Colors.green,
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              fontSize: Sizes.xs,
              fontWeight: "bold",
              color: Colors.white,
              textAlign: "center",
              marginRight: 5,
              marginTop: Platform.OS === "ios" ? 2 : 0,
            }}
          >
            {cartLength}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Feather name="shopping-bag" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ padding: 10, marginTop: 5 }}>
          <Text
            style={{
              fontSize: Sizes["4xl"],
              fontWeight: "bold",
              color: Colors.black,
            }}
          >
            Find The Best Furniture Here!
          </Text>
        </View>
        <SearchComp />
        <Swiper />
        <View
          style={{
            marginTop: 2,
            padding: 13,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: Sizes.xl,
              fontWeight: "bold",
              color: Colors.black,
            }}
          >
            NEW RIVALS
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Rivals")}>
            <Feather name="grid" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Showcard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

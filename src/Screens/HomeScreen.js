import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Platform } from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/FontAwesome";
import { Feather } from "@expo/vector-icons";
import { Colors, Sizes } from "../Assets/index";
import SearchComp from "../Components/SearchComp";
import Swiper from "../Components/Swiper";
import Showcard from "../Components/Showcard";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
      <View
        style={{
          marginTop: Platform.OS === "android" ? Sizes["4xl"] : undefined,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 15,
          backgroundColor: Colors.white,
        }}
      >
        <Icon name="map-pin" size={Sizes["2xl"]} color={Colors.green} />
        <Text
          style={{ fontSize: Sizes.xl, fontWeight: "bold" }}
        >
          Ambur, TamilNadu
        </Text>
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
              marginTop:Platform.OS==="ios"?2:0
            }}
          >
            3
          </Text>
        </View>
        <Feather name="shopping-bag" size={24} color="black" />
      </View>
      <ScrollView>
        <View style={{ padding: 10, marginTop: 10 }}>
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

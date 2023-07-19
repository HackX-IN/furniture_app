import {
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import Rivals from "../Components/Rivals";
import Icon from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Sizes, Colors } from "../Assets/index";

const Arrivals = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View
        style={{
          marginTop: Platform.OS === "android" ? 33 : undefined,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 15, alignItems: "center", top: 5 }}
          >
            <Icon name="chevron-back-circle" size={32} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              padding: 10,
              marginTop: 10,
              fontSize: 22,
              color: "Black",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            New Arrivals
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Rivals />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Arrivals;

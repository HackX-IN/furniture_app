import { StyleSheet, Text, View,TouchableOpacity } from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/FontAwesome";
import { Colors } from "../Assets";
import { TextInput } from "react-native";

import {useNavigation} from '@react-navigation/native'

const SearchComp = () => {
  const navigation=useNavigation()
  return (
    <TouchableOpacity
     onPress={()=>navigation.navigate("Search")}
      style={{
        padding: 15,
        width: "95%",
        height: 50,
        backgroundColor: Colors.burlywood,
        borderRadius: 10,
        marginLeft: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop:8
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Icon name="search" size={20} color={Colors.black} />
        <TextInput
          placeholder="Search...."
          placeholderTextColor={Colors.black}
          style={{ fontSize: 14, alignItems: "flex-start" }}
        />
      </View>
      <Icon name="camera" size={22} color={Colors.black} />
    </TouchableOpacity>
  );
};

export default SearchComp;

const styles = StyleSheet.create({});

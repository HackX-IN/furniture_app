import { StyleSheet, Text, View,TouchableOpacity } from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/FontAwesome";
import { Colors } from "../Assets";
import { TextInput } from "react-native";

import {useNavigation} from '@react-navigation/native'
import { SafeAreaView } from "react-native";

const SearchComp = () => {
  const navigation=useNavigation()
  return (
    <SafeAreaView style={{flex:1,marginTop:45}}>
    <View
    
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
      <View style={{ flexDirection: "row", gap: 13 }}>
      <Icon name="camera" size={22} color={Colors.black} />
        
        <TextInput
          placeholder="Search...."
          placeholderTextColor={Colors.black}
          style={{ fontSize: 14, alignItems: "flex-start",width:"80%" }}
        />
      </View>
      <Icon name="search" size={20} color={Colors.black} />
    </View>
    </SafeAreaView>
    
  );
};

export default SearchComp;

const styles = StyleSheet.create({});

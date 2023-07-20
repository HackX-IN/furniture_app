import { StyleSheet, Text, View,TouchableOpacity,Image, Dimensions, FlatList } from "react-native";
import React, { useState } from "react";
import Icon from "@expo/vector-icons/FontAwesome";
import { Colors } from "../Assets";
import { TextInput } from "react-native";

import {useNavigation} from '@react-navigation/native'
import { SafeAreaView } from "react-native";
import SearchResult from "../Components/SearchResult";
import axios from "axios";

const { width, height } = Dimensions.get("window");
const SearchComp = () => {
  const[searchResults,setSearchResults]=useState([])
  const[searchKey,setSearchKey]=useState("")

  console.log(searchKey)

  const HandleSearch=async()=>{
try {
  const response=await axios.get(`https://productserver-4mtw.onrender.com/api/v1/search/${searchKey}`)
  console.log(response.data)
  setSearchResults(response.data)
  setSearchKey("")

} catch (error) {
  console.log(error)
}
  
  }

  const navigation=useNavigation()
  return (
    <SafeAreaView style={{flex:1,marginTop:15}}>
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
          value={searchKey}
          onChangeText={(text)=>setSearchKey(text)}
          style={{ fontSize: 14, alignItems: "flex-start",width:"80%" }}
        />
      </View>
   
      <TouchableOpacity onPress={()=>HandleSearch()}>
      <Icon name="search" size={20} color={Colors.black} />
       </TouchableOpacity>
    </View>
    {
      searchResults.length===0?(
        <View style={{justifyContent:"center",alignItems:"center",padding:10,marginTop:35}}>
        <Image source={require('../Assets/images/search.png')} style={{width:width*1,height:width*1}}/>
        
        </View>
      ):(
        <FlatList
        data={searchResults}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          return (<SearchResult item={item}/>)
        
        }}
        
        />
      )
    }
    </SafeAreaView>
    
  );
};

export default SearchComp;

const styles = StyleSheet.create({});

import { View, Text, FlatList, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
import { Colors } from "../Assets/index.js";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import useFetch from '../Hooks/UseFetch.js';



// const List = [
//   {
//     "_id": "64b6447e55bb2c20e4475efe",
//     "title": "BlazeChairs",
//     "supplier": "Flipkart",
//     "imageUrl": "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
//     "price": "$180",
//     "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
//     "location": "Banglore",
//     "createdAt": "2023-07-18T07:51:26.577Z",
//     "updatedAt": "2023-07-18T07:51:26.577Z",
//     "__v": 0
//     },
//     {
//     "_id": "64b6442855bb2c20e4475efc",
//     "title": "GoldBench",
//     "supplier": "Amazon",
//     "imageUrl": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=958&q=80",
//     "price": "$100",
//     "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
//     "location": "Chennai",
//     "createdAt": "2023-07-18T07:50:00.755Z",
//     "updatedAt": "2023-07-18T07:50:00.755Z",
//     "__v": 0
//     },
//     {
//     "_id": "64b6438655bb2c20e4475efa",
//     "title": "Italian Sofa",
//     "supplier": "Amazon",
//     "imageUrl": "https://images.unsplash.com/photo-1550226891-ef816aed4a98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
//     "price": "$300",
//     "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
//     "location": "Mumbai",
//     "createdAt": "2023-07-18T07:47:18.559Z",
//     "updatedAt": "2023-07-18T07:47:18.559Z",
//     "__v": 0
//     },
//     {
//       "_id": "64b67af24ca5c6ae635a3f4c",
//       "title": "HallKart",
//       "supplier": "Flipkart",
//       "imageUrl": "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
//       "price": "$870",
//       "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
//       "location": "Bengluru",
//       "createdAt": "2023-07-18T11:43:46.907Z",
//       "updatedAt": "2023-07-18T11:43:46.907Z",
//       "__v": 0
//   },
//   {
//       "_id": "64b67ad04ca5c6ae635a3f4a",
//       "title": "Couch",
//       "supplier": "Flipkart",
//       "imageUrl": "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZnVybml0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
//       "price": "$470",
//       "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
//       "location": "Mumbai",
//       "createdAt": "2023-07-18T11:43:12.622Z",
//       "updatedAt": "2023-07-18T11:43:12.622Z",
//       "__v": 0
//   },
//   {
//       "_id": "64b67ab24ca5c6ae635a3f48",
//       "title": "PinkyChair",
//       "supplier": "Amazon",
//       "imageUrl": "https://plus.unsplash.com/premium_photo-1688125414656-ab91164cbd1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZnVybml0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
//       "price": "$270",
//       "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
//       "location": "Delhi",
//       "createdAt": "2023-07-18T11:42:42.142Z",
//       "updatedAt": "2023-07-18T11:42:42.142Z",
//       "__v": 0
//   },
// ];

const Showcard = () => {

 const {data,loading,error}=useFetch()


    const navigation=useNavigation()
  return (
    <View style={{ padding: 10, marginTop: 2 }}>

    {
      loading?(
      <ActivityIndicator size={32} color="black"/>
      ):error?(
        <Text>Something Went Wrong</Text>
      ):(
        <FlatList
        contentContainerStyle={{ paddingHorizontal: 5, gap: 10 }}
        
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
             onPress={()=>navigation.navigate('Product',{ item:item})}
              style={{
                height: height * 0.3,
                width: width * 0.45,
               
             
                
              }}
            >
              <View style={{ flex: 1 }}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ flex: 1, }}
                />
                <View style={{ flexDirection: "row",
                justifyContent: "space-between",
                padding: 5,
                alignItems: "center",  backgroundColor: Colors.burlywood,}}>
                <Text style={{
                  fontSize: 18,
                  color: "black",
                  fontWeight: "700",
                  marginLeft:6,
                  marginBottom:-8
                }}>{item.supplier}</Text>
               
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 15,
                    backgroundColor: Colors.burlywood,
                    alignItems: "center",
                    borderBottomLeftRadius:10,
                    borderBottomRightRadius:10
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "black",
                      fontWeight: "700",
                    }}
                  >
                    {item.price}.00
                  </Text>
                  <TouchableOpacity
                 
                    style={{
                    
                      borderRadius: 5,
                    }}
                  >
                   <Ionicons name="add-circle" size={24} color="black"/>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      )
    }

     
    </View>
  );
};

export default Showcard;

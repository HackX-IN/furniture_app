import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView,Image, Dimensions,TouchableOpacity,ActivityIndicator } from 'react-native';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from '../Assets';

import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
const { width, height } = Dimensions.get("window");

const Favorite = (
  {navigation}
) => {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    retrieveToken();
  }, []);

  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        const decodedToken = jwt_decode(token);
       
        const { name, email,userId } = decodedToken;
       
        setUser({ name, email,userId});
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  const userId = user?.userId; // Replace with the actual userId
  useEffect(() => {
    // Fetch the user's wishlist
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`https://productserver-4mtw.onrender.com/api/v1/user/${userId}/wishlist`);
        setWishlist(response.data);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };
  
    if (userId) {
      fetchWishlist();
    }
  }, [userId]);
  
  const removeFromWishlist = async (productId) => {
    try {
      setLoading(true); // Set loading to true before making the API request
  
      const response = await axios.delete(
        `https://productserver-4mtw.onrender.com/api/v1/user/${userId}/wishlist/${productId}`
      );
  
      setWishlist(response.data.wishlist);
      setLoading(false); // Set loading to false after fetching data
  
      Toast.show({
        type: 'success',
        text1: 'Product removed Successfully',
        position: 'top',
        visibilityTime: 2000, // 2 seconds
        autoHide: true,
      });
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      setLoading(false); // Set loading to false in case of an error
  
      Toast.show({
        type: 'error',
        text1: 'Failed to remove product',
        position: 'top',
        visibilityTime: 3000, // 3 seconds
        autoHide: true,
      });
    }
  };
  
  

  return (
    <SafeAreaView style={styles.container}>
    <View style={{marginTop:20}}>
     <TouchableOpacity onPress={()=>navigation.goBack()} style={{position:"absolute",top:6,left:5,zIndex:999}}>
     <AntDesign name="back" size={24} color="black" />
     </TouchableOpacity>
      <Text style={styles.header}>Favorite Products</Text>
      {loading ? ( // Display the loading indicator while loading is true
      <ActivityIndicator size="large" color="blue"  />
    ) : (
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.product}>
          <Image source={{uri:item.imageUrl}} style={{width:80,height:80,borderRadius:50,marginLeft:5,resizeMode:"cover"}}/>
         <View style={{flexDirection:"column",marginLeft:10}}>
         <Text style={styles.productName}>{item.title}</Text>
         <Text style={styles.productPrice}>{item.price}</Text>
         </View>
         <TouchableOpacity onPress={() => removeFromWishlist(item._id)} style={{top:30,position:"absolute",right:15}}>
         <AntDesign name="delete" size={24} color="black" />
         </TouchableOpacity>
          </View>
        )}
      />)}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:"center"
  },
  product: {
    marginBottom: 15,
    flexDirection:"row",
    alignItems:"center",
    width:width-40,
    backgroundColor:Colors.burlywood,
    height:90,
    borderRadius:30
  },
  productName: {
    fontSize: 18,
    fontWeight:"600"
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
    padding:2
  },
});

export default Favorite;

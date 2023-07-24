import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal
} from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/Ionicons";
import { Entypo, Feather } from "@expo/vector-icons";
import { Sizes, Colors } from "../Assets/index";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Toast from 'react-native-toast-message';
import { useCart } from '../Hooks/userContext';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
const { width, height } = Dimensions.get("window");


const ProductPage = ({ navigation, route }) => {
  const [count, setCount] = useState(1);
  const [saved, setSaved] = useState(false);

  const [user, setUser] = useState(null);

  const { cartDispatch } = useCart();

  const getGoogleUserDetails = async () => {
    try {
      // Check if user is already signed in
      const isSignedIn = await GoogleSignin.isSignedIn();

      if (!isSignedIn) {
        // User is not signed in, show error message or handle sign-in flow
        Toast.show({
          type: "error",
          text1: "Not Signed In",
          text2: "Please sign in with Google.",
          position: "top",
          visibilityTime: 3000, // 3 seconds
          autoHide: true,
        });
        return;
      }

      // Get the user info
      const userInfo = await GoogleSignin.signInSilently();
      console.log(userInfo)
      setUser(userInfo.user);

    } catch (error) {
      console.log("Google Sign-In Error:", error);

      // Handle specific error codes if needed
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // User needs to sign in
        // Show error message or handle sign-in flow
      }
    }
  };


const addToCart = () => {
  const itemToAdd = { _id: item._id, title: item.title, price: item.price, quantity: count,image:item.imageUrl };

  cartDispatch({
    type: 'ADD_TO_CART',
    payload: itemToAdd,
  });

  console.log('Added to Cart:', itemToAdd);

  // Show the toast message for successful addition to the cart
  Toast.show({
    type: 'success',
    text1: 'Added to Cart',
    visibilityTime: 2000, // 2 seconds
    autoHide: true,
  });
};

  // State variable to control the visibility of the cart modal
  const [isCartModalVisible, setCartModalVisible] = useState(false);

  useEffect(() => {
    retrieveToken();
    getGoogleUserDetails();
  }, []);

  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        const decodedToken = jwt_decode(token);
        console.log(decodedToken)
        const { name, email,userId } = decodedToken;
       
        setUser({ name, email,userId});
      }
    } catch (error) {
      console.log(error);
    }
  };
 

  const { item } = route.params;
  const calculateTotalAmount = () => {
    // Assuming that the price of the product is in `item.price` and quantity is in `count`
    return item.price * count;
  };
  const Increment = () => {
    setCount(count + 1);
  };
  const Decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const userId = user?.userId; // Replace with the actual userId
  const productId = item?._id;

  
  const addToWishlist = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await axios.post(`https://productserver-4mtw.onrender.com/api/v1/user/${userId}/wishlist/${productId}`);
      
      console.log(response.data);
      setSaved(true)
      Toast.show({
        type: 'success',
        text1: 'Product Added Successfully',
        position: 'top',
        visibilityTime: 2000, // 2 seconds
        autoHide: true,
      }); // The updated user object with wishlist
    } catch (error) {
      
      Toast.show({
        type: 'error',
        text1: 'User Not Found',
        text2: 'Please check your email and password.',
        position: 'top',
        visibilityTime: 3000, // 3 seconds
        autoHide: true,
      });
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whitesmoke }}>
      <View
        style={{
          marginHorizontal: 20,
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 5,
          flexDirection: "row",
          position: "absolute",
          zIndex: 999,
          top: Platform.OS === "android" ? 23 : 62,
          width: width - 40,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-circle" size={28} color="black" />
        </TouchableOpacity>
       { saved ?  (<TouchableOpacity > 
        <AntDesign name="heart" size={24} color="red" />
        </TouchableOpacity>):(
          <TouchableOpacity onPress={addToWishlist} >
          <Feather name="heart" size={24} color="black" />
          </TouchableOpacity>
        )}
      
      </View>
      <Image
        source={{
          uri: item.imageUrl,
        }}
        style={{
          aspectRatio: Platform.OS === "android" ? 1 : 1,
          resizeMode: "cover",
        }}
      />
      <View
        style={{
          marginTop: -12,
          backgroundColor: Colors.whitesmoke,
          width: width,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      >
        <View
          style={{
            marginHorizontal: 20,
            paddingBottom: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: width - 44,
            top: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "800" }}>{item.title}</Text>
          <Text style={{ fontSize: 18, fontWeight: "800" }}>
            {item.price}.00
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 10,
            width: width - 10,
            top: 5,
          }}
        >
          <View
            style={{
              top: 14,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              marginHorizontal: 14,
            }}
          >
            {[1, 2, 3, 4, 5].map((index) => (
              <Icon name="star" key={index} size={20} color="gold" />
            ))}
            <Text style={{ fontSize: 13, color: "gray" }}> (4.9)</Text>
          </View>

          <View
            style={{
              top: 14,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              marginHorizontal: 14,
            }}
          >
            <TouchableOpacity onPress={() => Decrement()}>
              <AntDesign name="minuscircleo" size={22} color="black" />
            </TouchableOpacity>

            <Text style={{ fontSize: 18, color: "gray", padding: 10 }}>
              {count}
            </Text>
            <TouchableOpacity onPress={() => Increment()}>
              <AntDesign name="pluscircleo" size={22} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            width: width - 10,
            top: 5,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "black",
              padding: 15,
              fontWeight: "bold",
            }}
          >
            Description
          </Text>
          <Text
            style={{ fontSize: 14, color: "gray", padding: 15, marginTop: -20 }}
          >
            {item.description}
          </Text>
        </View>
        <View
          style={{
            width: width - 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            top: 5,
            padding: 10,
            marginLeft: 8,
            backgroundColor: Colors.burlywood,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Feather name="map-pin" size={24} color="black" />
            <Text style={{ fontSize: 13, color: "black", marginLeft: 8 }}>
              {item.location}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Feather name="truck" size={22} color="black" />
            <Text style={{ fontSize: 12.5, color: "black", marginLeft: 4 }}>
              Free Delivery
            </Text>
          </View>
        </View>

        <View
          style={{
            width: width - 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            top: 10,
            padding: 10,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              backgroundColor: Colors.black,
              width: width - 200,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: "white", fontWeight: "600" }}>
              BUY NOW
            </Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={() => {
            addToCart()
          }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black",
              borderRadius: 50,
              width: 40,
              height: 40,
            }}
          >
            <Feather
              name="shopping-bag"
              size={24}
              color="white"
              style={{ alignItems: "center", justifyContent: "center" }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
      animationType="slide"
      transparent={true}
      visible={isCartModalVisible}
      onRequestClose={() => setCartModalVisible(false)}
    >
      <View style={styles.cartModalContainer}>
        <View style={styles.cartModalContent}>
          {/* Cart items and total amount */}
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Cart Items:</Text>
         
          {[
            { productId: "12345", quantity: 2 },
            { productId: "67890", quantity: 1 },
          ].map((item) => (
            <Text key={item.productId} style={{ fontSize: 16 }}>
              {item.productId} - Quantity: {item.quantity}
            </Text>
          ))}
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
            Total Cart Amount:
          </Text>
          <Text style={{ fontSize: 16 }}>{calculateTotalAmount()}</Text>

          {/* Close button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setCartModalVisible(false)}
          >
            <Text style={{ fontSize: 18, color: "white" }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </SafeAreaView>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  cartModalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  cartModalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    maxHeight: height * 0.6,
  },
  closeButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.black,
    borderRadius: 10,
    width: width - 40,
    padding: 15,
    position: "absolute",
    bottom: 20,
    left: 20,
  },
});

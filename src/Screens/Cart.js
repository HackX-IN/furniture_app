import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useCart } from "../Hooks/userContext";
import { AntDesign } from "@expo/vector-icons";
import { ToastAndroid } from "react-native"; // Import ToastAndroid
import { Dimensions } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get("window");

const Cart = ({ navigation }) => {
  const { cartState, cartDispatch } = useCart();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCartData = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        if (cartData) {
          cartDispatch({ type: "RESTORE_CART", payload: JSON.parse(cartData) });
        }
        setLoading(false);
      } catch (error) {
        console.log('Error retrieving cart data:', error);
        setLoading(false);
      }
    };

    getCartData();
  }, []);


  const handleRemoveFromCart = (itemId) => {
    cartDispatch({ type: "REMOVE_FROM_CART", payload: itemId });
  };

  const handleIncrement = (itemId) => {
    cartDispatch({ type: "INCREMENT_QUANTITY", payload: itemId });
  };

  const handleDecrement = (itemId) => {
    const item = cartState.cartItems.find((item) => item._id === itemId);
    if (item && item.quantity > 1) {
      cartDispatch({ type: "DECREMENT_QUANTITY", payload: itemId });
    }
  };
  const saveCartToStorage = async (cartItems) => {
    try {
      const cartData = JSON.stringify(cartItems);
      await AsyncStorage.setItem('cart', cartData);
    } catch (error) {
      console.log('Error saving cart data:', error);
    }
  };
  

  const calculateTotalCartPrice = () => {
    let total = 0;
    cartState.cartItems.forEach((item) => {
      // Remove any non-numeric characters from the price string and parse it to a float
      const priceNumeric = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      total += priceNumeric * item.quantity;
    });
    return total.toFixed(2); // Round to 2 decimal places
  }

  const handlePaymentSuccess = (paymentId) => {
   
    const orderedItems = [...cartState.cartItems];

  
    const orderId = `ORDER_${Math.floor(Math.random() * 100000)}`;

   
    const paymentDetails = {
      paymentId,
      paymentMode: "Razorpay", 
    };

    const shippingTime = "2-4 business days"; 

    cartState.cartItems.forEach((item) => {
      handleRemoveFromCart(item._id);
    });

    // Show a success message
    Toast.show({
      type: "success",
      text1: "Payment successful",
      visibilityTime: 2000, // 2 seconds
      autoHide: true,
    });

    
    navigation.navigate("Order", {
      orderedItems,
      orderId,
      paymentDetails,
      imageUrl,
      shippingTime,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            {/* Go Back icon */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Cart</Text>
            {cartState.cartItems.length > 0 && (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  right: 0,
                  position: "absolute",
                  top: 3,
                }}
                onPress={() => {
                  var options = {
                    description: "Credits towards consultation",
                    image: "https://i.imgur.com/3g7nmJC.jpg",
                    currency: "INR",
                    key: "rzp_test_wb5X8MvZuy14EK",
                    amount: calculateTotalCartPrice() * 100,
                    name: "Royal_Furniture",
                    order_id: "",
                    prefill: {
                      email: "gaurav.kumar@example.com",
                      contact: " 911111111 ",
                      name: "XXX-XXXX-XXX ",
                    },
                    theme: { color: "#f7E540" },
                  };
                  RazorpayCheckout.open(options)
                    .then((data) => {
                      // handle success
                      handlePaymentSuccess(data.razorpay_payment_id); // Call handlePaymentSuccess with the payment ID
                    })
                    .catch((error) => {
                      // handle failure
                      Toast.show({
                        type: "error",
                        text1: "Payment Failed",
                        visibilityTime: 2000, // 2 seconds
                        autoHide: true,
                      });
                      // navigation.navigate("Order", {
                      //   orderedItems,
                      //   orderId,
                      //   paymentDetails,
                      //   imageUrl,
                      //   shippingTime,
                      // });
                    });
                }}
              >
              
                <Text
                  style={{
                    fontSize: 20,
                    color: "green",
                    fontWeight: "bold",
                    marginRight: 5,
                  }}
                >
                  Proceed
                </Text>
                <AntDesign name="arrowright" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>
          {cartState.cartItems.map((item) => (
            <View key={item._id} style={styles.cartItem}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 80, height: 80, borderRadius: 50 }}
              />
              <View
                style={{ flexDirection: "column", marginLeft: 10, top: 10 }}
              >
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>Price: {item.price}</Text>
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => handleDecrement(item._id)}
                  style={styles.quantityButton}
                >
                  <AntDesign name="minus" size={18} color="white" />
                </TouchableOpacity>
                <Text style={styles.itemQuantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => {
                    handleIncrement(item._id);
                  }}
                  style={styles.quantityButton}
                >
                  <AntDesign name="plus" size={18} color="white" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => handleRemoveFromCart(item._id)}
                style={styles.removeButton}
              >
                <AntDesign name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ))}
          {cartState.cartItems.length === 0 && (
            <View style={styles.emptyCartContainer}>
              <Text style={styles.emptyCartText}>Your cart is empty.</Text>
              <Image
                source={require("../Assets/images/empty.png")} // Replace with the actual path to the image
                style={styles.emptyCartImage}
              />
            </View>
          )}
        </ScrollView>
        {cartState.cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Amt :</Text>
          <Text style={styles.totalAmount}>₹{calculateTotalCartPrice()}</Text>
        </View>)}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
    color: "black",
  },
  cartItem: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    width: width - 40,
    flexDirection: "row",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    color: "gray",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    position: "absolute",
    top: 10,
    right: 10,
  },
  quantityButton: {
    backgroundColor: "#DEB887",
    padding: 6,
    borderRadius: 4,
    marginRight: 10,
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    right: 4,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E8B57",
  },
  removeButton: {
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    top: 50,
    left: 120,
  },
  removeButtonText: {
    color: "black",
    fontSize: 16,
  },
  totalContainer: {
    position: "absolute",
    bottom: 55, // Add some spacing from the bottom
    left: 50,
    right: 0,
    backgroundColor: "rgba(22, 23, 22,0.1)",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 999,
    borderRadius: 20,
    width: "80%",
  },

  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E8B57",
    marginLeft: -80,
  },
  emptyCartContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 170,
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign:"center",
    marginLeft:25
  },
  emptyCartImage: {
    width: 200,
    height: 200,
  },
});

export default Cart;

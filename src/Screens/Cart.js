import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView,ActivityIndicator, } from 'react-native';
import { useCart } from '../Hooks/userContext';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");
const Cart = ({ navigation }) => {
  const { cartState, cartDispatch } = useCart();
  const [loading, setLoading] = useState(true);


  const handleRemoveFromCart = (itemId) => {
    cartDispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const handleIncrement = (itemId) => {
    cartDispatch({ type: 'INCREMENT_QUANTITY', payload: itemId });
  };

  const handleDecrement = (itemId) => {
    const item = cartState.cartItems.find(item => item._id === itemId);
    if (item && item.quantity > 1) {
      cartDispatch({ type: 'DECREMENT_QUANTITY', payload: itemId });
    }
  };

  const calculateTotalPrice = (item) => {
    const priceNumeric = parseFloat(item.price.replace('$', ''));
    return priceNumeric * item.quantity;
  }

  const calculateTotalCartPrice = () => {
    let total = 0;
    cartState.cartItems.forEach(item => {
      const priceNumeric = parseFloat(item.price.replace('$', ''));
      total += priceNumeric * item.quantity;
    });
    return total.toFixed(2); // Round to 2 decimal places
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
        <TouchableOpacity style={{flexDirection:"row",alignItems:"center",right:0,position:"absolute",top:3}}>
        <Text style={{fontSize:20,color:"green",fontWeight:"bold",marginRight:5}}>Proceed</Text>
     
        <AntDesign name="arrowright" size={24} color="black" />
     
        </TouchableOpacity>
      </View>
      {cartState.cartItems.map(item => (
        <View key={item._id} style={styles.cartItem}>
          <Image source={{ uri: item.image }} style={{ width: 80, height: 80,borderRadius:50 }} />
          <View style={{flexDirection:"column",marginLeft:10,top:10}}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemPrice}>Price: {item.price}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => handleDecrement(item._id)} style={styles.quantityButton}>
              <AntDesign name="minus" size={18} color="white" />
            </TouchableOpacity>
            <Text style={styles.itemQuantity}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => { handleIncrement(item._id) }} style={styles.quantityButton}>
              <AntDesign name="plus" size={18} color="white" />
            </TouchableOpacity>
          </View>
         
          <TouchableOpacity onPress={() => handleRemoveFromCart(item._id)} style={styles.removeButton}>
          <AntDesign name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ))}
      {/* Total cart price */}
     
    </ScrollView>
   
      <View style={styles.totalContainer}>
       
          
            <Text style={styles.totalText}>Total Amt :</Text>
            <Text style={styles.totalAmount}>${calculateTotalCartPrice()}</Text>
          
         
        
      </View>
 
  </View>
  
   </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
   
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    color: 'black',
  },
  cartItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    width:width-40,
    flexDirection:"row",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: 'gray',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    position:"absolute",
    top:10,
    right:10
  },
  quantityButton: {
    backgroundColor: '#FF6347',
    padding: 6,
    borderRadius: 4,
    marginRight: 10,
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign:"center",
    right:4
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  removeButton: {
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    top:50,
    left:120
  },
  removeButtonText: {
    color: 'black',
    fontSize: 16,
  },
  totalContainer: {
    position: 'absolute',
    bottom: 55, // Add some spacing from the bottom
    left: 50,
    right: 0,
    backgroundColor: 'rgba(22, 23, 22,0.1)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 999,
    borderRadius:20,
    width:"80%"
  },
  
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginLeft:-80
  },
});

export default Cart;

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';


  const Cart = () => {
    const cartItems = useSelector((state) => state.cartItems);
    console.log('cartItems state:', cartItems);
  

  return (
    <View>
      <Text>Cart</Text>
      {cartItems.map((item) => (
        <Text key={item?.id} style={{alignItems:"center",padding:15,color:"black"}}>{item?.title} - {item?.price}</Text>
      ))}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});

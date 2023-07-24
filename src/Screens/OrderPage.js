import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OrderPage = ({ route }) => {
  const { orderedItems, orderId, paymentDetails, imageUrl, shippingTime } = route.params;
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.orderDetailsText}>Order Details:</Text>
      {orderedItems.map((item) => (
        <View key={item._id} style={styles.itemContainer}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <View style={styles.itemInfoContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>Price: {item.price}</Text>
            <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
            <Text style={styles.itemId}>Order ID: {orderId}</Text>
            <Text style={styles.paymentId}>Payment ID: {paymentDetails.paymentId}</Text>
          </View>
        </View>
      ))}

      <View style={styles.orderInfoContainer}>
      
        <Text style={styles.shippingTime}>Approx. Shipping Time: {shippingTime}</Text>
      </View>

      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  orderDetailsText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  itemInfoContainer: {
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: 'gray',
  },
  itemQuantity: {
    fontSize: 16,
    color: 'gray',
  },
  itemId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentId: {
    fontSize: 16,
    marginTop: 5,
  },
  orderInfoContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
  padding:10,
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 10,
  },
  shippingTime: {
    fontSize: 16,
    marginTop: 10,
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  goBackText: {
    fontSize: 18,
    marginLeft: 5,
  },
});

export default OrderPage;

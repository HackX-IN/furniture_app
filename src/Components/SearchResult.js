import { Dimensions, Image, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("window");

const SearchResult = ({ item }) => {
    const navigation=useNavigation()
  return (
    <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate("Product",{item:item})}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.supplier}>{item.supplier}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    width: width - 30,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 55,
    resizeMode: "contain",
  },
  details: {
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  supplier: {
    fontSize: 14,
    color: "gray",
  },
  price: {
    fontSize: 12,
    color: "gray",
  },
})

export default SearchResult;

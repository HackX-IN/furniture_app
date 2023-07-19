import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const Favorite = ({ navigation }) => {
  const [favoriteItem, setFavoriteItem] = useState(null);

  useEffect(() => {
    // Function to retrieve the favorite item from AsyncStorage
    const fetchFavoriteItem = async () => {
      try {
        const storedItem = await AsyncStorage.getItem("favoriteItem");
        if (storedItem) {
          setFavoriteItem(JSON.parse(storedItem));
        }
      } catch (error) {
        // Handle AsyncStorage errors
        console.error("Error fetching favorite item:", error);
      }
    };

    fetchFavoriteItem(); // Call the function when the component mounts
  }, []);

  const removeFavoriteItem = async () => {
    try {
      await AsyncStorage.removeItem("favoriteItem");
      setFavoriteItem(null);
    } catch (error) {
      console.error("Error removing favorite item:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: Platform.OS === "android" ? 40 : 10 }}>
    <TouchableOpacity onPress={()=>navigation.goBack()} style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
    
   
        
          <Text style={styles.text}>Favorite</Text>
          </TouchableOpacity>
        {favoriteItem && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              padding: 10,
              backgroundColor: "gray",
              width: width - 80,
              flexDirection: "row",
              borderRadius: 30,
              marginLeft: -20,
            }}
          >
            <Image
              source={{ uri: favoriteItem.imageUrl }}
              style={{ width: 80, height: 80, borderRadius: 50 }}
            />
            <View style={{ marginLeft: 10, flexDirection: "column" }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 18, color: "white" }}
              >
                {favoriteItem.title}
              </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 14, color: "black" }}
              >
                {favoriteItem.price}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  color: "black",
                  width: width - 190,
                }}
                numberOfLines={2}
              >
                {favoriteItem.description}
              </Text>
            </View>
            {/* Add other properties as needed */}
            <View style={{ alignItems: "flex-end", right: 28 }}>
              <TouchableOpacity onPress={removeFavoriteItem}>
                <MaterialIcons name="delete-outline" size={28} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Favorite;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    
  },
  itemContainer: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
    alignItems: "center",
  },
});
// Add more

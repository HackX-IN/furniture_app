import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/Ionicons";
import { Entypo, Feather } from "@expo/vector-icons";
import { Sizes, Colors } from "../Assets/index";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const ProductPage = ({ navigation, route }) => {
  const [count, setCount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteItem, setFavoriteItem] = useState(null);

  const { item } = route.params;

  useEffect(() => {
    const fetchFavoriteItem = async () => {
      try {
        const storedItem = await AsyncStorage.getItem("favoriteItem");
        if (storedItem) {
          setFavoriteItem(JSON.parse(storedItem));
          setIsFavorite(true); // If item exists in AsyncStorage, set isFavorite to true
        }
      } catch (error) {
        console.error("Error fetching favorite item:", error);
      }
    };

    fetchFavoriteItem();
  }, []);

  const Increment = () => {
    setCount(count + 1);
  };
  const Decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const toggleFavorite = async () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    try {
      if (!isFavorite) {
        await AsyncStorage.setItem("favoriteItem", JSON.stringify(item));
      } else {
        await AsyncStorage.removeItem("favoriteItem");
      }
    } catch (error) {
      console.error("Error saving favorite item:", error);
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
          top: Platform.OS === "android" ? 43 : 52,
          width: width - 40,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-circle" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFavorite}>
          {isFavorite ? (
            <Entypo name="heart" size={24} color="red" />
          ) : (
            <Feather name="heart" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: item.imageUrl,
        }}
        style={{
          aspectRatio: Platform.OS === "android" ? 1 : 1.5,
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

          <View
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
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductPage;

const styles = StyleSheet.create({});

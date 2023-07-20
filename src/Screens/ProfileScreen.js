import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { SafeAreaView } from "react-native";
import { Platform } from "react-native";
import {
  FontAwesome5,
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";

import { Sizes, Colors } from "../Assets/index";
import Toast from "react-native-toast-message";

import { Dimensions } from "react-native";
import { ActivityIndicator } from "react-native";

const { width, height } = Dimensions.get("window");

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    retrieveToken();
  }, []);

  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        const decodedToken = jwt_decode(token);
        const { name, email } = decodedToken;
        setUser({ name, email });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      // Remove the token from AsyncStorage
      await AsyncStorage.removeItem("token");

      // Show toast message for successful logout
      Toast.show({
        type: "success",
        text1: "Logged Out Successfully",
        position: "top",
        visibilityTime: 2000, // 2 seconds
        autoHide: true,
      });

      // Navigate to the login screen or any other screen
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Please check your email and password.",
        position: "top",
        visibilityTime: 3000, // 3 seconds
        autoHide: true,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginTop: Platform.OS === "android" ? 28 : undefined }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 15 }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Ionicons name="chevron-back" size={26} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 130,
              fontSize: 19,
              fontWeight: "700",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            Profile
          </Text>
        </View>
        <View
          style={{
            width: width - 40,
            backgroundColor: Colors.green,
            padding: 15,
            alignItems: "center",
            marginLeft: 20,
            borderRadius: 10,
            justifyContent: "space-between",
            flexDirection: "row",
            height: 70,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <FontAwesome5 name="bitcoin" size={24} color="yellow" />
            <Text
              style={{
                fontSize: 14,
                color: "white",
                textAlign: "center",
                marginLeft: 5,
              }}
            >
              700 pts
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Text style={{ fontSize: 16, color: "white", textAlign: "center" }}>
              History
            </Text>
            <Entypo
              name="chevron-right"
              size={25}
              color="black"
              style={{ marginTop: 3 }}
            />
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            top: 100,
            left: 20,
            width: width - 40,
            backgroundColor: Colors.black,
            height: 170,
            borderRadius: 20,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Image
              source={require("../Assets/images/naruto.png")}
              style={{
                width: 70,
                height: 70,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: "white",
                resizeMode: "cover",
              }}
            />
            {user ? (
              <>
                <Text
                  style={{ fontSize: 17, fontWeight: "600", color: "white" }}
                >
                  {user.name}
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "400", color: "white" }}
                >
                  {user.email}
                </Text>
              </>
            ) : (
              <ActivityIndicator size={22} color="white" />
            )}
          </View>
          <View
            style={{
              width: width - 70,
              left: 10,
              backgroundColor: "white",

              borderRadius: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <MaterialCommunityIcons
                name="crown-circle-outline"
                size={24}
                color="gold"
                style={{ marginLeft: 5 }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: "black",
                  textAlign: "center",
                  marginLeft: 3,
                }}
              >
                Gold Member
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 12, color: "black", textAlign: "center" }}
              >
                See Benefits
              </Text>
              <Entypo
                name="chevron-right"
                size={25}
                color="black"
                style={{ marginTop: 3 }}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            top: 300,
            width: width - 20,
            padding: 20,

            backgroundColor: "white",
            left: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <MaterialIcons name="payment" size={24} color="black" />
              <Text
                style={{
                  fontSize: 14,
                  color: "black",
                  textAlign: "center",
                  marginLeft: 3,
                }}
              >
                Payment Method
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Entypo
                name="chevron-right"
                size={25}
                color="black"
                style={{ marginTop: 3 }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
            onPress={() => navigation.navigate("Fav")}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <MaterialIcons name="favorite" size={24} color="black" />
              <Text
                style={{
                  fontSize: 14,
                  color: "black",
                  textAlign: "center",
                  marginLeft: 3,
                }}
              >
                Your Favorites
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Entypo
                name="chevron-right"
                size={25}
                color="black"
                style={{ marginTop: 3 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
            onPress={() => navigation.navigate("Cart")}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <MaterialIcons name="shopping-bag" size={24} color="black" />
              <Text
                style={{
                  fontSize: 14,
                  color: "black",
                  textAlign: "center",
                  marginLeft: 3,
                }}
              >
                Cart
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Entypo
                name="chevron-right"
                size={25}
                color="black"
                style={{ marginTop: 3 }}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <MaterialCommunityIcons
                name="form-textbox-password"
                size={24}
                color="black"
              />
              <Text
                style={{
                  fontSize: 14,
                  color: "black",
                  textAlign: "center",
                  marginLeft: 3,
                }}
              >
                Change Password
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Entypo
                name="chevron-right"
                size={25}
                color="black"
                style={{ marginTop: 3 }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Entypo name="help-with-circle" size={24} color="black" />
              <Text
                style={{
                  fontSize: 14,
                  color: "black",
                  textAlign: "center",
                  marginLeft: 3,
                }}
              >
                Get Help
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Entypo
                name="chevron-right"
                size={25}
                color="black"
                style={{ marginTop: 3 }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
            onPress={handleLogout}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <AntDesign name="logout" size={24} color="red" />
              <Text
                style={{
                  fontSize: 14,
                  color: "red",
                  textAlign: "center",
                  marginLeft: 3,
                }}
              >
                Log Out
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Entypo
                name="chevron-right"
                size={25}
                color="black"
                style={{ marginTop: 3 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

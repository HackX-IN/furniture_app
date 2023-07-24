import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  useColorScheme,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";
import { Sizes, Colors } from "../Assets/index";

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  GoogleSignin.configure({
    webClientId: '144192600594-4p75aro9ksn7k5k1inpn2682d06tqhr5.apps.googleusercontent.com',
  });
  const GoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
      setIsLoading(true);
  
      try {
        const userCredential = await auth().signInWithCredential(googleCredential);
        if (userCredential && userCredential.user) {
          // User is signed in successfully
          navigation.navigate("bottom");
        } else {
          console.log("User sign-in failed.");
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: 'Please check your email and password.',
            position: 'top',
            visibilityTime: 3000, // 3 seconds
            autoHide: true,
          });
        }
      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Please check your email and password.',
          position: 'top',
          visibilityTime: 3000, // 3 seconds
          autoHide: true,
        });
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Please check your email and password.',
        position: 'top',
        visibilityTime: 3000, // 3 seconds
        autoHide: true,
      });
    }
  };
  
  

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    try {
      if (!validateEmail(email)) {
        setErrorMessage('Invalid email address');
        return;
      }
      setErrorMessage('');
      setIsLoading(true);

      const response = await axios.post(
        "https://productserver-4mtw.onrender.com/api/v1/user/login",
        {
          email,
          password,
        }
      );
      const { token } = response.data;

      setEmail("");
      setPassword("");

      await AsyncStorage.setItem("token", token);
      navigation.navigate("bottom");

      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        position: 'top',
        visibilityTime: 2000,
        autoHide: true,
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Please check your email and password.',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const checkLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        // If the token exists, the user is already logged in using email/password
        navigation.navigate("bottom");
      } else {
        // If the token doesn't exist, check if the user is signed in with Google
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
          // User is signed in with Google, navigate to the "bottom" screen
          navigation.navigate("bottom");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  const colorScheme = useColorScheme();

  useEffect(() => {
    checkLoggedIn();
  }, []);
  return (
    <View style={styles.container}>
    <StatusBar
    barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
    backgroundColor={colorScheme === "dark" ? "#0C1C2C" : "white"}
  />
      <View style={{ backgroundColor: "#0C1C2C", height: 260, width: width }}>
        <View style={{ position: "absolute", top: 100, left: 20 }}>
          <Text style={{ fontSize: 32, fontWeight: "bold", color: "white" }}>
            Sign in to your{"\n"}Account
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}>
            Sign in to your account
          </Text>
        </View>
      </View>

      <View
        style={{
          padding: 10,
          marginTop: 30,
          paddingHorizontal: 5,
          width: width - 40,
        }}
      >
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          onChangeText={setEmail}
        />
        <View style={[styles.input, { flexDirection: "row" }]}>
          <TextInput
            style={{
              width: "100%",
              padding: 14,
              marginLeft: -8,

              color: "black",
            }}
            value={password}
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={{ top: 16, position: 'absolute', right: 8 }}>
          {/* Use Entypo eye icon */}
          <Entypo name={isPasswordVisible ? 'eye' : 'eye-with-line'} size={22} color="black" />
        </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "400",
            textAlign: "right",
            color: "gray",
          }}
        >
          Forgot password ?
        </Text>
        <TouchableOpacity
        onPress={handleLogin}
        style={{
          top: 15,
          backgroundColor: "#C0E863",
          width: width - 50,
          padding: 15,
          borderRadius: 10,
          opacity: isLoading ? 0.7 : 1, // Adjust the opacity of the button when loading
        }}
        disabled={isLoading} // Disable the button while loading
      >
        {isLoading ? ( // Show loading indicator if isLoading is true
          <ActivityIndicator color="black" size={18} />
        ) : (
          <Text style={{ fontSize: 14, textAlign: "center", color: "black" }}>
            Login
          </Text>
        )}
      </TouchableOpacity>
        {errorMessage ? <Text style={{ color: 'red',top:15 }}>{errorMessage}</Text> : null}
        <View style={{ top: 50, flexDirection: "row" }}>
          <View
            style={{
              width: width - 280,
              borderWidth: 1,
              borderColor: "gray",
              height: 1,
              alignItems: "center",
              top:10
            }}
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              textAlign: "center",
              color: "black",
             marginLeft:5,
             marginRight:5
            }}
          >
            Or login with
          </Text>
          <View
            style={{
              width: width - 280,
              borderWidth: 1,
              borderColor: "gray",
              height: 1,
              alignItems: "center",
              top:10
            }}
          />
        </View>
        <View style={{top:100,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
        
        <TouchableOpacity
          onPress={GoogleLogin}
          style={{
            top: 15,
            borderWidth: 1,
          borderColor:"gray",
            width: width - 250,
            padding: 15,
            borderRadius: 10,
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"center"
          }}
        >
        <AntDesign name="google" size={24} color="black" />
          <Text style={{ fontSize: 14, textAlign: "center", color: "black",marginLeft:2 }}>
           Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={handleLogin}
        style={{
          top: 15,
          borderWidth: 1,
          borderColor:"gray",
          width: width - 250,
          padding: 15,
          borderRadius: 10,
          flexDirection:"row",
          alignItems:"center",
          justifyContent:"center"
        }}
      >
      <Entypo name="facebook" size={24} color="black" />
        <Text style={{ fontSize: 14, textAlign: "center", color: "black",marginLeft:2 }}>
          Facebook
        </Text>
      </TouchableOpacity>
        
        </View>

        <View style={{top:180,justifyContent:"center",alignItems:"center"}}>
        <Text style={{textAlign:"center",marginLeft:3}}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={{ color: "#C0E863",fontSize:14,fontWeight:600}}>Register</Text>
        </TouchableOpacity>
        
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    backgroundColor: "white",
  },
  input: {
    width: "100%",
    height: 60,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "black",
    borderColor: "gray",
    borderRadius: 10,
  },
  signupButton: {
    padding: 10,
    backgroundColor: "yellow",
    marginTop: 10,
  },
  signupText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default LoginScreen;

// <TextInput
// style={styles.input}
// value={email}
// placeholder="Email"
// onChangeText={setEmail}
// />
// <TextInput
// style={styles.input}
// value={password}
// placeholder="Password"
// onChangeText={setPassword}
// secureTextEntry
// />
// <Button title="Login" onPress={handleLogin} />
// <TouchableOpacity style={styles.signupButton}>
// <Text style={styles.signupText}>Don't have an Account? Sign Up</Text>
// </TouchableOpacity>

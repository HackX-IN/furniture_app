import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Email validation function
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

 

const handleSignup = async () => {
  try {
    // Perform password confirmation check
    if (password !== confirm) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Validate email address
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email address');
      return;
    }

    // Clear any previous error message
    setErrorMessage('');

    const response = await axios.post('https://productserver-4mtw.onrender.com/api/v1/register', {
      name,
      email,
      password
    });
    const { token } = response.data;

    // Save the token to AsyncStorage
    await AsyncStorage.setItem('token', token);
    navigation.navigate('Login');

    // Show toast message for successful signup
    Toast.show({
      type: 'success',
      text1: 'Signup Successful',
      position: 'top',
      visibilityTime: 2000, // 2 seconds
      autoHide: true,
    });
  } catch (error) {
    console.log(error);

    // Show toast message for signup error
    Toast.show({
      type: 'error',
      text1: 'Signup Failed',
      text2: 'An error occurred during signup. Please try again.',
      position: 'top',
      visibilityTime: 3000, // 3 seconds
      autoHide: true,
    });
  }
};


  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#0C1C2C', height: 260, width: width }}>
        <View style={{ position: 'absolute', top: 150, left: 20 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>Register</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'gray' }}>Create your account</Text>
        </View>
      </View>

      <View style={{ padding: 10, marginTop: 30, paddingHorizontal: 5, width: width - 40, marginLeft: 5 }}>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Name"
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          onChangeText={setEmail}
        />
        <View style={[styles.input, { flexDirection: 'row' }]}>
        <TextInput
          style={{ width: '100%', padding: 14, marginLeft: -8, color: 'black' }}
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
        <View style={[styles.input, { flexDirection: 'row' }]}>
          <TextInput
            style={{ width: '100%', padding: 14, marginLeft: -8, color: 'black' }}
            value={confirm}
            placeholder="Confirm Password"
            onChangeText={setConfirm}
            secureTextEntry={!isPasswordVisible} // Toggle secureTextEntry based on isPasswordVisible state
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={{ top: 16, position: 'absolute', right: 8 }}>
            {/* Use Entypo eye icon */}
            <Entypo name={isPasswordVisible ? 'eye' : 'eye-with-line'} size={22} color="black" />
          </TouchableOpacity>
        </View>

        {/* Display error message if any */}
        {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}

        <TouchableOpacity
          onPress={handleSignup}
          style={{
            top: 15,
            backgroundColor: '#C0E863',
            width: width - 50,
            padding: 15,
            borderRadius: 10,
          }}>
          <Text style={{ fontSize: 14, textAlign: 'center', color: 'black', fontWeight: 'bold' }}>Register</Text>
        </TouchableOpacity>

        <View style={{ top: 150, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ textAlign: 'center', marginLeft: 3 }}>
            Don't have an account?{' '}
           
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: '#C0E863', fontSize: 14, fontWeight: '600' }}>Sign-in</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
    borderColor: 'gray',
    borderRadius: 10,
  },
});

export default SignupScreen;

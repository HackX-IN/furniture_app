import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { Colors } from "../Assets/index.js";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const Swiper = () => {
  const Slides = [
    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  ];
  return (
    <View
      style={{
        padding: 10,
        flexDirection: "row",
        marginTop: 6,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SliderBox
        images={Slides}
        sliderBoxHeight={200}
        dotColor={Colors.gray}
        inactiveDotColor={Colors.white}
        //   dotStyle={{
        //     width: 15,
        //     height: 15,
        //     borderRadius: 15,
        //     marginHorizontal: 10,
        //     padding: 0,
        //     margin: 0
        //   }}
        ImageComponentStyle={{
          borderRadius: 10,
          width: width * 0.9,
          marginTop: 10,
        }}
        autoplay
        circleLoop
      />
    </View>
  );
};

export default Swiper;

const styles = StyleSheet.create({});

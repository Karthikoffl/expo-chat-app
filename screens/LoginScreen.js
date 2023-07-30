import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { BGImage, Logo } from "../assets";
import UserTextInput from "../components/UserTextInput";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const screenWidth = Math.round(Dimensions.get("window").width);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}
    >
      <Image
        source={BGImage}
        resizeMode="cover"
        style={{ height: 280, width: screenWidth }}
      />
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          borderTopLeftRadius: 90,
          marginTop: -80,
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
      >
        <Image
          source={Logo}
          style={{ width: 60, height: 60 }}
          resizeMode="contain"
        />
        <Text
          style={{
            paddingVertical: 20,
            color: "#555",
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          Welcome Back!
        </Text>

        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UserTextInput
            placeholder="Email"
            isPass={false}
            setStateValue={setEmail}
          />
          <UserTextInput
            placeholder="Password"
            isPass={true}
            setStateValue={setPassword}
          />
        </View>
        <TouchableOpacity
          style={{
            width: "100%",
            paddingHorizontal: 40,
            paddingVertical: 20,
            borderRadius: 10,
            backgroundColor: "#43c651",
            marginHorizontal: 20,
            marginVertical: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: 600, color: "#fff", fontSize: 16 }}>
            Sign In
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <Text style={{ color: "#555" }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
            <Text style={{ fontWeight: 500, color: "#056526" }}>
              Create Here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

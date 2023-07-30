import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { BGImage, Logo } from "../assets";
import UserTextInput from "../components/UserTextInput";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const screenWidth = Math.round(Dimensions.get("window").width);
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          Join with us!
        </Text>
        {/* <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            marginVertical: 5,
          }}
        >
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              padding: 5,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "#43c651",
              position: "relative",
            }}
          >
            <Image
              source={{ uri: "" }}
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UserTextInput
            placeholder="Full Name"
            isPass={false}
            setStateValue={setName}
          />
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
          <Text style={{ color: "#555" }}>Already have an account </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={{ fontWeight: 600, color: "#056526" }}>
              Login Here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

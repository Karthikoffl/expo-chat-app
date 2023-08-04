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
import { avatars } from "../utils/support";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firestoreDB } from "../config/firebase.config";
import { doc, setDoc } from "firebase/firestore";

const SignUpScreen = () => {
  const screenWidth = Math.round(Dimensions.get("window").width);
  const screenHeight = Math.round(Dimensions.get("window").height);
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(avatars[0]?.image.asset.url);
  const [isAvatarMenu, setIsAvatarMenu] = useState(false);
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  const handleAvatar = (item) => {
    setAvatar(item?.image.asset.url);
    setIsAvatarMenu(false);
  };

  const handleSignUp = async () => {
    if (getEmailValidationStatus && email !== "") {
      await createUserWithEmailAndPassword(firebaseAuth, email, password).then(
        (userCred) => {
          const data = {
            _id: userCred?.user.uid,
            fullName: name,
            profilePic: avatar,
            providerData: userCred.user.providerData[0],
          };

          setDoc(doc(firestoreDB, "users", userCred?.user.uid), data).then(
            () => {
              navigation.navigate("LoginScreen");
            }
          );
        }
      );
    }
  };

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}
    >
      <Image
        source={BGImage}
        resizeMode="cover"
        style={{ height: 280, width: screenWidth }}
      />

      {isAvatarMenu && (
        <>
          <View
            style={{
              position: "absolute",
              zIndex: 10,
              inset: 0,
              width: screenWidth,
              height: screenHeight,
            }}
          >
            <ScrollView>
              <BlurView
                style={{
                  height: screenHeight,
                  width: screenWidth,
                  paddingVertical: 30,
                  paddingHorizontal: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  flexWrap: "wrap",
                }}
                tint="light"
                intensity={40}
              >
                {avatars?.map((item) => (
                  <TouchableOpacity
                    onPress={() => handleAvatar(item)}
                    key={item._id}
                    style={{
                      width: 60,
                      height: 60,
                      marginVertical: 20,
                      marginHorizontal: 30,
                      padding: 1,
                      borderRadius: 50,
                      borderWidth: 1,
                      borderColor: "#1871ED",
                      position: "relative",
                    }}
                  >
                    <Image
                      source={{ uri: item?.image.asset.url }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </TouchableOpacity>
                ))}
              </BlurView>
            </ScrollView>
          </View>
        </>
      )}

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
        <ScrollView style={{ width: "100%", height: "100%" }}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <TouchableOpacity
              onPress={() => setIsAvatarMenu(true)}
              style={{
                width: 70,
                height: 70,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: "#1871ED",
                position: "relative",
              }}
            >
              <Image
                source={{ uri: avatar }}
                resizeMode="contain"
                style={{ width: "100%", height: "100%" }}
              />
              <View
                style={{
                  width: 25,
                  height: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  top: 0,
                  right: -5,
                  backgroundColor: "#1871ED",
                  borderRadius: 50,
                }}
              >
                <MaterialIcons name="edit" size={15} color={"#FFF"} />
              </View>
            </TouchableOpacity>
          </View>
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
              setGetEmailValidationStatus={setGetEmailValidationStatus}
            />
            <UserTextInput
              placeholder="Password"
              isPass={true}
              setStateValue={setPassword}
            />
          </View>
          <TouchableOpacity
            onPress={handleSignUp}
            style={{
              paddingHorizontal: 40,
              paddingVertical: 20,
              borderRadius: 10,
              backgroundColor: "#1871ED",
              marginHorizontal: 10,
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
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={{ fontWeight: 600, color: "#1871ED" }}>
                Login Here
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SignUpScreen;

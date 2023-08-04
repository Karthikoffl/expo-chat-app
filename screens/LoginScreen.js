import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { BGImage, Logo } from "../assets";
import UserTextInput from "../components/UserTextInput";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firestoreDB } from "../config/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import SET_USER from "../context/actions/userActions";
import { useDispatch } from "react-redux";

const LoginScreen = () => {
  const screenWidth = Math.round(Dimensions.get("window").width);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleLogin = async () => {
    if (getEmailValidationStatus && email !== "") {
      await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log("User ID: ", userCred?.user.uid);
            getDoc(doc(firestoreDB, "users", userCred?.user.uid)).then(
              (docSnap) => {
                if (docSnap.exists()) {
                  dispatch(SET_USER(docSnap.data()));
                }
              }
            );
          }
        })
        .catch((err) => {
          console.log("Error : ", err.message);
          if (err.message.includes("wrong-password")) {
            setAlert(true);
            setAlertMessage("Invalid Password");
          } else if (err.message.includes("user-not-found")) {
            setAlert(true);
            setAlertMessage("User is not exist");
          } else {
            setAlert(true);
            setAlertMessage("Invalid Email Address");
          }
          setInterval(() => {
            setAlert(false);
          }, 2000);
        });
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
          {alert && (
            <Text style={{ color: "red", fontSize: 14 }}>{alertMessage}</Text>
          )}

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
          onPress={handleLogin}
          style={{
            width: "100%",
            paddingHorizontal: 40,
            paddingVertical: 20,
            borderRadius: 10,
            backgroundColor: "#1871ED",
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
            <Text style={{ fontWeight: 600, color: "#1871ED" }}>
              Create Here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

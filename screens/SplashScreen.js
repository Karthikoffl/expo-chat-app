import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useLayoutEffect } from "react";
import { Logo } from "../assets";
import { firebaseAuth, firestoreDB } from "../config/firebase.config";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { SET_USER } from "../context/actions/userActions";
import { useDispatch } from "react-redux";

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    checkLoggedUser();
  }, []);

  const checkLoggedUser = async () => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred?.uid) {
        getDoc(doc(firestoreDB, "users", userCred?.uid))
          .then((docSnap) => {
            if (docSnap.exists()) {
              dispatch(SET_USER(docSnap.data()));
            }
          })
          .then(() => {
            setTimeout(() => {
              navigation.replace("HomeScreen");
            }, 2000);
          });
      } else {
        navigation.replace("LoginScreen");
      }
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={Logo}
        style={{ width: 80, height: 80, marginBottom: 70 }}
        resizeMode="contain"
      />
      <ActivityIndicator size={"large"} color={"#1871ED"} />
    </View>
  );
};

export default SplashScreen;

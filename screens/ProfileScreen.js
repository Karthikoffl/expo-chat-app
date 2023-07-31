import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { firebaseAuth } from "../config/firebase.config";
import { SET_USER_NULL } from "../context/actions/userActions";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await firebaseAuth.signOut().then(() => {
      dispatch(SET_USER_NULL());
      navigation.replace("LoginScreen");
    });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="chevron-left" size={32} color={"#555"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <MaterialCommunityIcons name="dots-vertical" size={24} color="#555" />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            position: "relative",
            borderWidth: 1,
            padding: 1,
            borderColor: "#43c651",
            borderRadius: 50,
          }}
        >
          <Image
            source={{ uri: user?.profilePic }}
            style={{ height: 90, width: 90 }}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 600,
            paddingTop: 10,
            color: "#056526",
          }}
        >
          {user?.fullName}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 400,
            color: "#555",
            paddingTop: 5,
          }}
        >
          {user?.providerData.email}
        </Text>
      </View>
      {/* //icons */}
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingVertical: 20,
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 10,
              backgroundColor: "#BEBEBE",
            }}
          >
            <MaterialIcons name="messenger-outline" size={24} color={"#555"} />
          </TouchableOpacity>
          <Text style={{ fontSize: 13, paddingVertical: 5, color: "#555" }}>
            Message
          </Text>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 10,
              backgroundColor: "#BEBEBE",
            }}
          >
            <Ionicons name="ios-videocam-outline" size={24} color={"#555"} />
          </TouchableOpacity>
          <Text style={{ fontSize: 13, paddingVertical: 5, color: "#555" }}>
            Video Call
          </Text>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 10,
              backgroundColor: "#BEBEBE",
            }}
          >
            <Ionicons name="call-outline" size={24} color={"#555"} />
          </TouchableOpacity>
          <Text style={{ fontSize: 13, paddingVertical: 5, color: "#555" }}>
            Call
          </Text>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 10,
              backgroundColor: "#BEBEBE",
            }}
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="#555"
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 13, paddingVertical: 5, color: "#555" }}>
            More
          </Text>
        </View>
      </View>
      {/* media share */}
      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: 600, color: "#555" }}>Media Shared</Text>
          <TouchableOpacity>
            <Text style={{ fontWeight: 600, color: "#555" }}>View All</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              width: 90,
              height: 90,
              marginVertical: 20,
              borderRadius: 10,
              backgroundColor: "#bebebe",
              overflow: "hidden",
            }}
          >
            <Image
              source={{
                uri: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              }}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 90,
              height: 90,
              marginVertical: 20,
              borderRadius: 10,
              backgroundColor: "#bebebe",
              overflow: "hidden",
            }}
          >
            <Image
              source={{
                uri: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              }}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 90,
              height: 90,
              marginVertical: 20,
              borderRadius: 10,
              backgroundColor: "#bebebe",
              overflow: "hidden",
            }}
          >
            <Image
              source={{
                uri: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              }}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#00000068",
              }}
            >
              <Text style={{ color: "white", fontWeight: 600, fontSize: 16 }}>
                250+
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* settings options */}
      <View
        style={{
          width: "100%",
          paddingVertical: 10,
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="security" size={24} color={"#555"} />
          <Text
            style={{
              fontWeight: 600,
              color: "#555",
              paddingHorizontal: 5,
              fontSize: 16,
            }}
          >
            Privacy
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color={"#555"} />
      </View>
      <View
        style={{
          width: "100%",
          paddingVertical: 10,
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="message" size={24} color={"#555"} />
          <Text
            style={{
              fontWeight: 600,
              color: "#555",
              paddingHorizontal: 5,
              fontSize: 16,
            }}
          >
            Groups
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color={"#555"} />
      </View>
      <View
        style={{
          width: "100%",
          paddingVertical: 10,
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="music-note" size={24} color={"#555"} />
          <Text
            style={{
              fontWeight: 600,
              color: "#555",
              paddingHorizontal: 5,
              fontSize: 16,
            }}
          >
            Media's & Downloads
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color={"#555"} />
      </View>
      <View
        style={{
          width: "100%",
          paddingVertical: 10,
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="person" size={24} color={"#555"} />
          <Text
            style={{
              fontWeight: 600,
              color: "#555",
              paddingHorizontal: 5,
              fontSize: 16,
            }}
          >
            Account
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color={"#555"} />
      </View>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          width: "100%",
          paddingHorizontal: 10,
          paddingVertical: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#056526",
            paddingHorizontal: 10,
          }}
        >
          Log Out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;

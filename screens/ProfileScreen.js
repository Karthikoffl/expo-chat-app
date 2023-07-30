import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);

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
      <View></View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

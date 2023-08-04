import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { firestoreDB } from "../config/firebase.config";

const AddToChatScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const [addChat, setAddChat] = useState("");

  const createNewChat = async () => {
    let id = `${Date.now()}`;

    const _doc = {
      _id: id,
      user: user,
      chatName: addChat,
    };

    if (addChat !== "") {
      setDoc(doc(firestoreDB, "chats", id), _doc)
        .then(() => {
          setAddChat("");
          navigation.replace("HomeScreen");
        })
        .catch((err) => {
          alert("Error : ", err);
        });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: 200,
          backgroundColor: "#1871ED",
          paddingHorizontal: 4,
          paddingVertical: 6,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 10,
            paddingVertical: 50,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="chevron-left" size={32} color={"#fbfbfb"} />
          </TouchableOpacity>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "#1871ED",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: user?.profilePic }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: 30,
          flex: 1,
          marginTop: -25,
        }}
      >
        <View
          style={{ width: "100%", paddingHorizontal: 4, paddingVertical: 4 }}
        >
          <View
            style={{
              width: "100%",
              paddingHorizontal: 20,
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#cdcdcd",
              marginTop: 40,
            }}
          >
            <Ionicons name="chatbubbles" size={24} color={"#777"} />
            <TextInput
              placeholder="Create a chat"
              placeholderTextColor={"#999"}
              value={addChat}
              onChangeText={(text) => setAddChat(text)}
              style={{
                flex: 1,
                fontSize: 18,
                color: "#555",
                width: "100%",
                paddingHorizontal: 20,
              }}
            />
            <TouchableOpacity onPress={createNewChat}>
              <FontAwesome name="send" size={24} color={"#777"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddToChatScreen;

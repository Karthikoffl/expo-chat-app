import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Logo } from "../assets";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { firestoreDB } from "../config/firebase.config";

const HomeScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState(null);

  useLayoutEffect(() => {
    const chatQuery = query(
      collection(firestoreDB, "chats"),
      orderBy("_id", "desc")
    );

    const unsubscribe = onSnapshot(chatQuery, (querySnapShot) => {
      const chatRooms = querySnapShot.docs.map((doc) => doc.data());
      setChats(chatRooms);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 30,
            paddingBottom: 20,
            paddingHorizontal: 20,
          }}
        >
          <Image
            source={Logo}
            resizeMode="contain"
            style={{ height: 50, width: 50 }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileScreen")}
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
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            width: "100%",
            paddingHorizontal: 10,
            paddingTop: 10,
            marginBottom: 120,
          }}
        >
          <View style={{ width: "100%" }}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  color: "#555",
                  fontWeight: 800,
                  fontSize: 18,
                }}
              >
                Messages
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddToChatScreen")}
              >
                <Ionicons name="chatbox" size={28} color={"#555"} />
              </TouchableOpacity>
            </View>
            {isLoading ? (
              <>
                <View
                  style={{
                    width: "100%",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size={"large"} color={"#1871ED"} />
                </View>
              </>
            ) : (
              <>
                {chats && chats?.length > 0 ? (
                  <>
                    {chats?.map((room) => (
                      <MessageCard key={room._id} room={room} />
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const MessageCard = ({ room }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ChatScreen", { room: room })}
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 2,
      }}
    >
      <View
        style={{
          height: 50,
          width: 50,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "#1871ED",
          margin: 10,
        }}
      >
        <FontAwesome5 name="users" size={24} color={"#555"} />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "center",
          marginLeft: 10,
        }}
      >
        <Text
          style={{
            color: "#333",
            fontSize: 14,
            fontWeight: 600,
            textTransform: "capitalize",
            paddingBottom: 5,
          }}
        >
          {room.chatName}
        </Text>
        <Text style={{ color: "#555", fontSize: 12 }}>
          Dummy message for testing expo chat with firebase ...
        </Text>
      </View>
      <Text
        style={{
          color: "#1871ED",
          paddingHorizontal: 10,
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        27 min
      </Text>
    </TouchableOpacity>
  );
};

export default HomeScreen;

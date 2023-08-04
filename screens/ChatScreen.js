import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { firestoreDB } from "../config/firebase.config";

const ChatScreen = ({ route }) => {
  const { room } = route.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(null);
  const user = useSelector((state) => state.user.user);

  const textInputRef = useRef(null);

  const handleKeyboardOpen = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const sendMessage = async () => {
    const timeStamp = serverTimestamp();
    const id = `${Date.now()}`;
    const _doc = {
      _id: id,
      roomId: room._id,
      timeStamp: timeStamp,
      message: message,
      user: user,
    };
    setMessage("");
    await addDoc(
      collection(doc(firestoreDB, "chats", room._id), "messages"),
      _doc
    )
      .then(() => {})
      .catch((err) => alert(err));
  };

  useLayoutEffect(() => {
    const msgQuery = query(
      collection(firestoreDB, "chats", room?._id, "messages"),
      orderBy("timeStamp", "asc")
    );

    const unsubscribe = onSnapshot(msgQuery, (querySnap) => {
      const upMsg = querySnap.docs.map((doc) => doc.data());
      setMessages(upMsg);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: 170,
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
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
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
                borderColor: "#fff",
                margin: 10,
              }}
            >
              <FontAwesome5 name="users" size={24} color={"#fbfbfb"} />
            </View>
            <View>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: 500,
                  textTransform: "capitalize",
                }}
              >
                {room.chatName.length > 16
                  ? `${room.chatName.slice(0, 16)}..`
                  : room.chatName}
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: 500,
                  textTransform: "capitalize",
                }}
              >
                online
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity>
              <FontAwesome5
                style={{ padding: 15 }}
                name="video"
                size={24}
                color="#fbfbfb"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome
                style={{ padding: 15 }}
                name="phone"
                size={24}
                color="#fbfbfb"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                style={{ padding: 15 }}
                name="dots-vertical"
                size={24}
                color="#fbfbfb"
              />
            </TouchableOpacity>
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
        <View style={{ marginBottom: 20 }} />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={160}
        >
          <>
            <ScrollView>
              {isLoading ? (
                <View
                  style={{
                    width: "100%",
                    top: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size={"large"} color={"#1871ED"} />
                </View>
              ) : (
                // messages
                <>
                  {messages?.map((msg, i) =>
                    msg.user.providerData.email === user.providerData.email ? (
                      <View style={{ margin: 5, paddingRight: 10 }} key={i}>
                        <View
                          style={{
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            borderTopLeftRadius: 20,
                            borderBottomLeftRadius: 20,
                            borderTopRightRadius: 20,
                            backgroundColor: "#1871ED",
                            width: "auto",
                            position: "relative",
                            alignSelf: "flex-end",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: "#FFF",
                              paddingHorizontal: 8,
                              paddingVertical: 2,
                            }}
                          >
                            {msg.message}
                          </Text>
                        </View>
                        <View style={{ alignSelf: "flex-end" }}>
                          {msg?.timeStamp?.seconds && (
                            <Text
                              style={{
                                fontSize: 12,
                                paddingTop: 5,
                                fontWeight: 400,
                              }}
                            >
                              {new Date(
                                parseInt(msg?.timeStamp?.seconds) * 1000
                              ).toLocaleTimeString("en-IN", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              })}
                            </Text>
                          )}
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          alignSelf: "flex-start",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          padding: 5,
                          marginTop: -10,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 5,
                          }}
                        >
                          <Image
                            style={{ height: 42, width: 42, borderRadius: 50 }}
                            resizeMode="cover"
                            source={{ uri: msg?.user?.profilePic }}
                          />
                          <View style={{ margin: 5, paddingRight: 10 }}>
                            <View
                              style={{
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                                borderTopRightRadius: 20,
                                borderBottomRightRadius: 20,
                                borderTopLeftRadius: 20,
                                backgroundColor: "#cdcdcd",
                                width: "auto",
                                position: "relative",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: 600,
                                  color: "#000",
                                  paddingHorizontal: 8,
                                  paddingVertical: 2,
                                }}
                              >
                                {msg.message}
                              </Text>
                            </View>
                            <View style={{ alignSelf: "flex-start" }}>
                              {msg?.timeStamp?.seconds && (
                                <Text
                                  style={{
                                    fontSize: 12,
                                    paddingTop: 5,
                                    fontWeight: 400,
                                  }}
                                >
                                  {new Date(
                                    parseInt(msg?.timeStamp?.seconds) * 1000
                                  ).toLocaleTimeString("en-IN", {
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  })}
                                </Text>
                              )}
                            </View>
                          </View>
                        </View>
                      </View>
                    )
                  )}
                </>
              )}
            </ScrollView>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: "#EDEDED",
                  borderRadius: 20,
                  paddingHorizontal: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "85%",
                  marginLeft: 15,
                }}
              >
                <TouchableOpacity
                  onPress={handleKeyboardOpen}
                  style={{ paddingRight: 10 }}
                >
                  <Entypo name="emoji-happy" size={24} color="#555" />
                </TouchableOpacity>
                <TextInput
                  style={{ height: 50, color: "#555", flex: 1 }}
                  placeholder="Type Here..."
                  placeholderTextColor={"#999"}
                  value={message}
                  onChangeText={(text) => setMessage(text)}
                />
                <TouchableOpacity>
                  <Entypo name="mic" size={24} color="#1871ED" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={sendMessage}
                style={{ padding: 10, marginRight: 5 }}
              >
                <FontAwesome name="send" size={24} color="#555" />
              </TouchableOpacity>
            </View>
          </>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default ChatScreen;

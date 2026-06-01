import { useState } from "react";
import {
  Pressable,
  Text,
  View,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [activeSection, setActiveSection] = useState("Login");

  const onLoginClick = () => {
    setActiveSection("Login");
  };

  const onRegisterClick = () => {
    setActiveSection("Register");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar barStyle={"dark-content"} />
        <View style={{ marginHorizontal: 16 }}>
          <View style={{ alignItems: "center", marginBottom: 28 }}>
            <Text style={{ fontWeight: 500, fontSize: 24 }}>
              Create an account
            </Text>
            <Text style={{ fontSize: 11, color: "#9A9A9A" }}>
              Already have an account? Login
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              padding: 4,
              backgroundColor: "#F8F8F8",
              borderRadius: 20,
              marginBottom: 32,
            }}
          >
            <Pressable
              onPress={onLoginClick}
              style={{
                flex: 1,
                alignItems: "center",
                paddingVertical: 12,
                backgroundColor:
                  activeSection === "Login" ? "#EFFF3D" : "transparent",
                borderRadius: 16,
              }}
            >
              <Text>Login</Text>
            </Pressable>
            <Pressable
              onPress={onRegisterClick}
              style={{
                flex: 1,
                alignItems: "center",
                paddingVertical: 12,
                backgroundColor:
                  activeSection === "Register" ? "#EFFF3D" : "transparent",
                borderRadius: 16,
              }}
            >
              <Text>Register</Text>
            </Pressable>
          </View>

          <View>
            <View style={{ gap: 8, marginBottom: 14 }}>
              <Text style={{ fontSize: 16, fontWeight: 400 }}>
                Email Address
              </Text>
              <TextInput
                placeholder="Enter Your Email"
                placeholderTextColor={'grey'}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  backgroundColor: "#F8F8F8",
                  borderRadius: 18,
                }}
              />
            </View>
            <View style={{ marginBottom: 14, gap: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: 400 }}>Password</Text>
              <TextInput
                placeholder="Enter Your Password"
                placeholderTextColor={'grey'}
                secureTextEntry={true}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  backgroundColor: "#F8F8F8",
                  borderRadius: 18,
                }}
              />
            </View>
            <Pressable
              onPress={() => alert("Login Successful")}
              style={{
                alignItems: "center",
                backgroundColor: "#EFFF3D",
                paddingVertical: 16,
                borderRadius: 24,
              }}
            >
              <Text>Login</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
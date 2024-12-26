import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import api from "./auth";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    navigation.navigate("SIGNUP");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        username: email,
        password: password,
      });

      if (
        response.data &&
        response.data.accessToken &&
        response.data.refreshToken
      ) {
        await AsyncStorage.setItem("accessToken", response.data.accessToken);
        await AsyncStorage.setItem("refreshToken", response.data.refreshToken);

        Alert.alert("Success", "Login successful!");
        navigation.navigate("PRODUCT");
      } else {
        throw new Error("No tokens received from server.");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      Alert.alert("Error", "Invalid email or password.");
    }
  };

  return (
    <View className="flex-1 bg-white items-center justify-center p-5">
      <Image
        source={require("../assets/logo.png")}
        className="h-30 w-30 mb-10"
        resizeMode="contain"
      />
      <Text className="text-4xl font-bold text-black text-center my-2">
        Welcome!
      </Text>
      <Text className="text-base text-gray text-center mb-7 leading-6">
        To the one-stop application for all types of fuel and other services
      </Text>

      {/* Login Form */}
      <View className="mt-5">
        <View className="flex-row items-center border border-gray rounded-full p-2 mb-4 w-full">
          <Ionicons name="mail-outline" size={30} color="gray" />
          <TextInput
            className="flex-1 pl-2"
            placeholder="Enter your email"
            placeholderTextColor="gray"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={{ borderWidth: 0, outlineWidth: 0 }}
          />
        </View>
        <View className="flex-row items-center border border-gray rounded-full p-2 mb-4">
          <SimpleLineIcons name="lock" size={30} color="gray" />
          <TextInput
            className="flex-1 pl-2"
            placeholder="Enter your password"
            placeholderTextColor="gray"
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={setPassword}
            style={{ borderWidth: 0, outlineWidth: 0 }}
          />
          <TouchableOpacity onPress={() => setSecureEntry((prev) => !prev)}>
            <SimpleLineIcons name="eye" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text className="text-right text-primary mb-4">Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-primary rounded-full mt-5"
          onPress={handleLogin}
        >
          <Text className="text-white text-lg text-center py-3">
            {loading ? "Login..." : "Login"}
          </Text>
        </TouchableOpacity>
        <View className="flex-row justify-center items-center my-5 gap-1">
          <Text className="text-gray">Don’t have an account?</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text className="text-primary underline font-bold">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

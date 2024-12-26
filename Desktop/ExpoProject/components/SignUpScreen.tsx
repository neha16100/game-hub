import React, { useState } from "react";
import { TextInput, TouchableOpacity, Text, View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [secureEntery, setSecureEntery] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post("https://dummyjson.com/users/add", {
        name,
        email,
        password,
      });

      if (response.data) {
        navigation.navigate("PAGE2");
      }
    } catch (err) {
      setError("Sign up failed, please try again");
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
        To the one stop application for all types of fuel and other services
      </Text>

      {/* Error Message */}
      {error && <Text className="text-red-500 text-center mb-2">{error}</Text>}

      {/* Form */}
      <View className="mt-5">
        <View className="border border-gray rounded-full flex-row items-center py-2 px-5 my-2 w-full">
          <SimpleLineIcons name="user" size={30} color="#5F5F5F" />
          <TextInput
            className="flex-1 pl-2"
            placeholder="Enter your name"
            placeholderTextColor="#5F5F5F"
            keyboardType="default"
            value={name}
            onChangeText={setName}
            style={{ borderWidth: 0, outlineWidth: 0 }}
          />
        </View>

        <View className="border border-gray rounded-full flex-row items-center py-2 px-5 my-2">
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

        <View className="border border-gray rounded-full flex-row items-center py-2 px-5 my-2">
          <SimpleLineIcons name="lock" size={30} color="gray" />
          <TextInput
            className="flex-1 pl-2"
            placeholder="Enter your password"
            placeholderTextColor="gray"
            secureTextEntry={secureEntery}
            value={password}
            onChangeText={setPassword}
            style={{ borderWidth: 0, outlineWidth: 0 }}
          />
          <TouchableOpacity onPress={() => setSecureEntery((prev) => !prev)}>
            <SimpleLineIcons name="eye" size={20} color="#5F5F5F" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-primary rounded-full mt-5"
          onPress={handleSignup}
        >
          <Text className="text-white text-xl text-center py-2">Sign up</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center items-center my-5 gap-1">
          <Text className="text-gray">Already have an account!</Text>
          <TouchableOpacity onPress={() => navigation.navigate("LOGIN")}>
            <Text className="text-primary underline font-bold">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;

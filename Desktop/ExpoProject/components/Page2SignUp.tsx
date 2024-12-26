import React, { useState } from "react";
import { TextInput, TouchableOpacity, Text, View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleGoNext = () => {
    if (!age || !phone) {
      setError("Please fill in all fields.");
      return;
    }

    navigation.navigate("PAGE3", { age, phone });
  };

  const handleGoBack = () => {
    navigation.goBack();
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
          <SimpleLineIcons name="user" size={30} color="gray" />
          <TextInput
            className="flex-1 pl-2"
            placeholder="Enter your age"
            placeholderTextColor="gray"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
            style={{ borderWidth: 0, outlineWidth: 0 }}
          />
        </View>

        <View className="border border-gray rounded-full flex-row items-center py-2 px-5 my-2">
          <Ionicons name="call-outline" size={30} color="gray" />
          <TextInput
            className="flex-1 pl-2"
            placeholder="Enter your phone number"
            placeholderTextColor="gray"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            style={{ borderWidth: 0, outlineWidth: 0 }}
          />
        </View>

        <TouchableOpacity
          className="bg-primary rounded-full mt-5"
          onPress={handleGoNext}
        >
          <Text className="text-white text-xl text-center py-2">Next</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-gray rounded-full mt-5"
          onPress={handleGoBack}
        >
          <Text className="text-white text-xl text-center py-2">Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

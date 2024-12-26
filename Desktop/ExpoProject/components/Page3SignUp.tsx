import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Image,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation, useRoute } from "@react-navigation/native";

const SignupScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("100");
  const { age, phone } = route.params || {};
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state

  const handleGoNext = () => {
    if (!productName || !quantity) {
      setError("Please fill in all fields.");
      return;
    }

    // Show the modal on successful form submission
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);

    navigation.navigate("LOGIN");
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
          <SimpleLineIcons name="tag" size={30} color="gray" />
          <TextInput
            className="flex-1 pl-2"
            placeholder="Enter product name"
            placeholderTextColor="gray"
            value={productName}
            onChangeText={setProductName}
            style={{ borderWidth: 0, outlineWidth: 0 }}
          />
        </View>

        <View className="border border-gray rounded-full flex-row items-center py-2 px-5 my-2">
          <Ionicons name="cube-outline" size={30} color="gray" />
          <TextInput
            className="flex-1 pl-2"
            placeholder="Enter quantity"
            placeholderTextColor="gray"
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
            style={{ borderWidth: 0, outlineWidth: 0 }}
          />
        </View>

        <TouchableOpacity
          className="bg-primary rounded-full mt-5"
          onPress={handleGoNext}
        >
          <Text className="text-white text-xl text-center py-2">Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gray rounded-full mt-5"
          onPress={handleGoBack}
        >
          <Text className="text-white text-xl text-center py-2">Back</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Window */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-5 rounded-lg w-80">
            <Text className="text-xl text-black mb-4 font-extrabold">
              Confirm Details
            </Text>
            <Text className="text-lg text-gray mb-2">
              Product Name: {productName}
            </Text>
            <Text className="text-lg text-gray mb-2">Quantity: {quantity}</Text>
            <Text className="text-lg text-gray mb-2">Age: {age}</Text>
            <Text className="text-lg text-gray mb-4">Phone: {phone}</Text>

            <TouchableOpacity
              className="bg-primary rounded-full py-2"
              onPress={handleCloseModal}
            >
              <Text className="text-white text-center text-lg">Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-3"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-center text-red-500">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SignupScreen;

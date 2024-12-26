import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

// Fetch products from the API
const fetchProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const productsData = await fetchProducts();
      setProducts(productsData);
      setFilteredProducts(productsData);
      setLoading(false);
    })();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }

  return (
    <View className="flex-1 items-center p-5 mt-10">
      {/* Location Section */}
      <View className="bg-primary p-4 rounded-xl mb-5 w-full">
        <View className="flex-row items-center">
          <Ionicons name="location-sharp" size={24} color="#FFFFFF" />
          <Text className="text-white text-lg font-bold ml-2">{text}</Text>
        </View>
      </View>

      {/* Search Input */}
      <TextInput
        style={{ padding: 10 }}
        className="w-full h-50 bg-white border border-gray rounded-lg mb-5 pl-3"
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Loading or Products List */}
      {loading ? (
        <Text className="text-lg">Loading products...</Text>
      ) : (
        <FlatList
          data={filteredProducts}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="flex-1 m-2 p-3 border border-gray rounded-lg bg-secondary items-center h-[500px] justify-between w-[250px]">
              <Image
                source={{ uri: item.images[0] }}
                style={{
                  width: "100%",
                  height: 100,
                  resizeMode: "contain",
                  marginBottom: 10,
                }}
              />
              <Text className="text-center text-lg font-bold mb-2">
                {item.title}
              </Text>
              <Text className="text-center text-sm mb-2">
                {item.description}
              </Text>
              <Text className="text-center text-sm mb-2">
                Category: {item.category}
              </Text>
              <Text className="text-center text-lg font-bold">
                ${item.price}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

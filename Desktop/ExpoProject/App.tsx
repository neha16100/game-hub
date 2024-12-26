import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignUpScreen";
import ProductScreen from "./components/ProductScreen";
import Page2SignUp from "./components/Page2SignUp";
import Page3SignUp from "./components/Page3SignUp";
import "./global.css";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={"LOGIN"} component={LoginScreen} />
        <Stack.Screen name={"SIGNUP"} component={SignupScreen} />
        <Stack.Screen name={"PRODUCT"} component={ProductScreen} />
        <Stack.Screen name={"PAGE2"} component={Page2SignUp} />
        <Stack.Screen name={"PAGE3"} component={Page3SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});

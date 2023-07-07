import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreens from "../screens/HomeScreens";
import WelcomeScreens from "../screens/WelcomeScreens";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="welcome"
      >
        <Stack.Screen name="Home" component={HomeScreens} />
        <Stack.Screen name="Welcome" component={WelcomeScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

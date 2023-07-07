import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreens() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 flex justify-around bg-white">
      <View className="space-y-2">
        <Text
          style={{ fontSize: wp(10) }}
          className="text-center font-bold text-gray-700"
        >
          ChatterPro
        </Text>
        <Text style={{ fontSize: wp(4) }} className="text-center">
          The Future is here , powered by AI
        </Text>
        <View className=" flex-row justify-center">
          <Image
            source={require("../../assets/chatterPro.png")}
            className="bg-center"
            style={{ width: wp(75), height: wp(75) }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
          className=" bg-emerald-600 mx-20 p-4 rounded-3xl"
        >
          <Text
            className="text-center font-bold text-white"
            style={{ fontSize: wp(6) }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

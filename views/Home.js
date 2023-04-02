import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { css } from "../assets/css/Css";

export default function Home({ navigation }) {
  return (
    <View style={css.container2}>
      <TouchableOpacity
        style={css.button__home}
        onPress={() => navigation.navigate("Login")}
      >
        <Image
          style={css.button__img}
          source={require("../assets/img/buttonLogin.png")}
        />
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Rastreio")}>
        <Image
          style={css.button__img}
          source={require("../assets/img/buttonRastreio.png")}
        />
        <Text>Rastreio</Text>
      </TouchableOpacity>
    </View>
  );
}

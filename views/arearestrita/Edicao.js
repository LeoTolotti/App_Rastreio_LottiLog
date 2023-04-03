import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { css } from "../../assets/css/Css";
import Icon from "react-native-vector-icons/FontAwesome";
import MenuAreaRestrita from "../../assets/components/MenuAreaRestrita";

export default function Edicao({ navigation }) {
  return (
    <View style={[css.container, css.containerTop]}>
      <MenuAreaRestrita title="Edição" navigation={navigation} />
    </View>
  );
}

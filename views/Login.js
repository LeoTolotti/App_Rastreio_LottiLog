import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  View,
} from "react-native";
import { css } from "../assets/css/Css";

export default function Login() {
  const [display, setDisplay] = useState("none");
  return (
    //KeyboardAvoidingView não deixa o teclado subir em cima dos componentes
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[css.container, css.darkbg]}
    >
      <View style={css.login__logomarca}>
        <Image
          style={css.login__logomarca_img}
          source={require("../assets/img/logomarca.png")}
        />
      </View>
      <View>
        <Text style={css.login__msg(display)}>Usuário ou senha inválidos!</Text>
      </View>
      <View style={css.login__form}>
        <TextInput style={css.login__input} placeholder="Usuário:" />
        <TextInput
          style={css.login__input}
          placeholder="Senha:"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={css.login__button}
          onPress={() => setDisplay("flex")}
        >
          <Text style={css.login__buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

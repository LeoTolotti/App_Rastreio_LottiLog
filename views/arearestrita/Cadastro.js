import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenuAreaRestrita from "../../assets/components/MenuAreaRestrita";
import config from "../../config/config";
import { css } from "../../assets/css/Css";

export default function Cadastro({ navigation }) {
  const address = config.origin;
  const [code, setCode] = useState(null);
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState("");
  const [response, setResponse] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    randomCode();
  }, []);

  //Pegar o id do usuário
  async function getUser() {
    let response = await AsyncStorage.getItem("userData");
    let json = JSON.parse(response);
    setUser(json.id);
  }

  //Gerar um código randômico
  async function randomCode() {
    let result = "";
    let length = 20;
    let chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    setCode(result);
  }

  //Envio do formulário
  async function sendForm() {
    let response = await fetch(
      `${config.urlRoot}create`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user,
          code: code,
          product: product,
          local: address,
        }),
      },
      setProduct("")
    );
  }
  const confirmForm = () =>
    Alert.alert(
      "Confirmação de produto",
      "UserID: " +
        user +
        "\n\nCodígo: " +
        code +
        "\n\nProduto: " +
        product +
        "\n\nLocal: " +
        address +
        "\n",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "OK", onPress: () => sendForm() },
      ]
    );
  return (
    <View>
      <MenuAreaRestrita title="Cadastro" navigation={navigation} />

      <View style={css.login__input}>
        <TextInput
          value={product}
          placeholder="Nome do Produto:"
          onChangeText={(text) => setProduct(text)}
          style={css.login__input}
        />
      </View>

      <TouchableOpacity style={css.login__button} onPress={confirmForm}>
        <Text style={css.login__buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

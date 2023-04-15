import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Alert, Platform } from "react-native";
import { css } from "./assets/css/Css";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Login, Rastreio } from "./views";
import AreaRestrita from "./views/arearestrita/AreaRestrita";
import config from "./config/config.json";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export default function App() {
  const Stack = createStackNavigator();
  const [expoPushToken, setExpoPushToken] = useState(null);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  useEffect(() => {
    if (expoPushToken != null) {
      sendToken();
    }
  }, [expoPushToken]);

  //Registra o token do usuário
  async function registerForPushNotificationsAsync() {
    console.log("1");
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  }
  //Envio do token
  async function sendToken() {
    console.log("3");
    let response = await fetch(config.urlRoot + "token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: expoPushToken,
      }),
    });
    console.log("4");
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "LottiLog",
            headerStyle: { backgroundColor: "#F58634" },
            headerTintColor: "#333",
            headerTitleStyle: { fontWeight: "bold", alignSelf: "center" },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen name="Rastreio" component={Rastreio} />
        <Stack.Screen
          name="AreaRestrita"
          options={{ headerShown: false }}
          component={AreaRestrita}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
/* import AppLoading from 'expo-app-loading'; */
import * as SplashScreen from 'expo-splash-screen';
import * as Font from "expo-font";
import { Asset } from 'expo-asset';
import { useColorScheme } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import LoggedOutNav from './navigators/LoggedOutNav';

export default function App() {
  const [ loading, setLoading ] = useState(true);

  /* Themes (Light/Dark Mode): https://reactnavigation.org/docs/themes/#using-the-operating-system-preferences */
  const colorScheme = useColorScheme();
  
  /* Replaced by SplashScreen (AppLoading is Deprecated) */
  /* const preload = () => {
    const fontsToLoad = [Ionicons.font];
    const fontsPromises = fontsToLoad.map(font => Font.loadAsync(font));
    return Promise.all(fontsPromises);
  };

  const onFinish  = () => {
    setLoading(false);
  }; 
  
  if (loading) {
    return (
      <AppLoading 
        startAsync={preload}
        onFinish={onFinish}
        onError={console.warn}
      />
    )
  } */

  /* How to Use SplashScreen For Preloading */
  useEffect (() => {
    async function prepare() {
      try { 
        await SplashScreen.preventAutoHideAsync(); /* Keep the Splash Screen Visible While Fetching Resources */
        await Font.loadAsync(Ionicons.font); /* API Calls (Preload Fonts in This Case) */
        await Asset.loadAsync(require("./assets/logo.png"));
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    }
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (!loading) {
      await SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) {
    return null;
  }

  /* onLayout in View -> onReady in Navigation Container */
  /* onReady: https://reactnavigation.org/docs/navigation-container/#onready */
  return (
    <NavigationContainer onReady={onLayout} theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <LoggedOutNav />
    </NavigationContainer>
  );
}

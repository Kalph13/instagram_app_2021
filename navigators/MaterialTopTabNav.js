import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";

const Tabs = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const MaterialTopTabNav = () => {
    return (
        <Tabs.Navigator
            tabBarPosition="bottom"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#000000"
                },
                tabBarActiveTintColor: "#ffffff",
                tabBarIndicatorStyle: {
                    backgroundColor: "#ffffff",
                    top: 0
                }
            }}
        >
            <Tabs.Screen name="SelectPhoto ">
                {() => (
                    <Stack.Navigator
                        screenOptions={{
                            headerTintColor: "#ffffff",
                            headerBackTitleVisible: false,
                            headerBackImage: ({ tintColor }) => (
                                <Ionicons color={tintColor} name="close" size={28} />
                            ),
                            headerStyle: {
                                backgroundColor: "#000000",
                                shadowOpacity: 0.3
                            }
                        }}
                    >
                        <Stack.Screen name="SelectPhoto" component={SelectPhoto} options={{ title: "Choose a photo" }} />
                    </Stack.Navigator>
                )}
            </Tabs.Screen>
            <Tabs.Screen name="TakePhoto" component={TakePhoto} />
        </Tabs.Navigator>
    );
};

export default MaterialTopTabNav;

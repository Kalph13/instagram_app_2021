import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import Rooms from "../screens/Rooms";
import Room from "../screens/Room";

const Stack = createStackNavigator();

const MessageNav = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: "#ffffff",
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: "#000000",
                    borderBottomColor: "rgba(255, 255, 255, 0.3)",
                    shadowColor: "rgba(255, 255, 255, 0.3)",
                }
            }}
        >
            <Stack.Screen
                name="Rooms"
                component={Rooms}
                options={{
                    headerBackImage: ({ tintColor }) => <Ionicons name="chevron-down" color={tintColor} size={28} />
                }}
            />
            <Stack.Screen name="Room" component={Room} />
        </Stack.Navigator>
    )
};

export default MessageNav;

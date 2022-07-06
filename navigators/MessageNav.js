import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Rooms from "../screens/Rooms";
import Room from "../screens/Room";

const Stack = createStackNavigator();

const MessageNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Rooms" component={Rooms} />
            <Stack.Screen name="Room" component={Room} />
        </Stack.Navigator>
    )
};

export default MessageNav;

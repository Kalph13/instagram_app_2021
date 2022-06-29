import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNav from "./BottomTabNav";
import MaterialTopTabNav from "./MaterialTopTabNav";

const Stack = createStackNavigator();

const LoggedInNav = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerMode: "screen",
                presentation: "modal"
            }}
        >
            <Stack.Screen name="BottomTabNav" component={BottomTabNav} />
            <Stack.Screen name="MaterialTopTabNav" component={MaterialTopTabNav} />
        </Stack.Navigator>
    );
};

export default LoggedInNav;

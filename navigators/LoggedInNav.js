import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import BottomTabNav from "./BottomTabNav";
import MaterialTopTabNav from "./MaterialTopTabNav";
import UploadForm from "../screens/UploadForm";

const Stack = createStackNavigator();

const LoggedInNav = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                presentation: "modal"
            }}
        >
            <Stack.Screen
                name="BottomTabNav"
                component={BottomTabNav} 
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="MaterialTopTabNav"
                component={MaterialTopTabNav}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="UploadForm"
                component={UploadForm}
                options={{
                    title: "Upload",
                    headerTintColor: "#ffffff",
                    headerBackTitleVisible: false,
                    headerBackImage: ({ tintColor }) => (
                        <Ionicons name="close" size={28} color={tintColor} />
                    ),
                    headerStyle: {
                        backgroundColor: "#000000"
                    }
                }}
            />
        </Stack.Navigator>
    );
};

export default LoggedInNav;

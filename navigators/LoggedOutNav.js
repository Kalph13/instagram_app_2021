import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import CreateAccount from "../screens/CreateAccount";

const Stack = new createStackNavigator();

const LoggedOutNav = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerTitle: false,
                headerTrasparent: true,
                headerTintColor: "#ffffff",
                headerStyle: {
                    backgroundColor: "#000000"
                }
            }}
        >
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
        </Stack.Navigator>
    )
};

export default LoggedOutNav;

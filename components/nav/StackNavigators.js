import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Feed from "../../screens/Feed";
import Search from "../../screens/Search";
import Notification from "../../screens/Notification";
import MyPage from "../../screens/MyPage";
import Profile from "../../screens/Profile";
import Photo from "../../screens/Photo";

const Stack = createStackNavigator();

const StackNavigators = ({ screenName }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerTintColor: "#ffffff",
                headerStyle: {
                    shadowColor: "rgba(255, 255, 255, 0.3)",
                    backgroundColor: "#000000"
                }
            }}
        >
            {screenName === "Feed" ? (
                <Stack.Screen name={"Feed"} component={Feed} />
            ) : null}
            {screenName === "Search" ? (
                <Stack.Screen name={"Search"} component={Search} />
            ) : null}
            {screenName === "Notification" ? (
                <Stack.Screen name={"Notification"} component={Notification} />
            ) : null}
            {screenName === "MyPage" ? (
                <Stack.Screen name={"MyPage"} component={MyPage} />
            ) : null}
            <Stack.Screen name={"Profile"} component={Profile} />
            <Stack.Screen name={"Photo"} component={Photo} />
        </Stack.Navigator>
    );
};

export default StackNavigators;

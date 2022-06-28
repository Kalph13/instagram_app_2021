import React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notification from "../screens/Notification";
import MyPage from "../screens/MyPage";
import Profile from "../screens/Profile";
import Photo from "../screens/Photo";
import Likes from "../screens/Likes";
import Comments from "../screens/Comments";

const Stack = createStackNavigator();

const StackNavigators = ({ screenName }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: "screen",
                headerBackTitleVisible: false,
                headerTintColor: "#ffffff",
                headerStyle: {
                    backgroundColor: "#000000",
                    shadowColor: "rgba(255, 255, 255, 0.3)",
                    borderBottomColor: "rgba(255, 255, 255, 0.3)"
                }
            }}
        >
            {screenName === "Feed" ? (
                <Stack.Screen
                    name={"Feed"}
                    component={Feed}
                    options={{
                        headerTitle: () => (
                            <Image 
                                style={{
                                    width: 120,
                                    height: 40,
                                }}
                                resizeMode="contain"
                                source={require("../assets/logo.png")}
                            />
                        )
                    }}
                />
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
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Photo" component={Photo} />
            <Stack.Screen name="Likes" component={Likes} />
            <Stack.Screen name="Comments" component={Comments} />
        </Stack.Navigator>
    );
};

export default StackNavigators;

import React from "react";
import { View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import StackNavigators from "./StackNavigators";
import TabIcon from "../components/nav/TabIcon";
import useFindMe from "../hooks/useFindMe";

const Tabs = createBottomTabNavigator();

const LoggedInNav = () => {
    const { data } = useFindMe();

    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#ffffff",
                tabBarshowLabel: false,
                tabBarActiveBackgroundColor: "#000000",
                tabBarInactiveBackgroundColor: "#000000",
                tabBarLabelStyle: {
                    marginTop: -5,
                    marginBottom: 5
                }
            }}
        >
            <Tabs.Screen
                name="Feed "
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon iconName={"home"} color={color} focused={focused} />
                    )
                }}
            >
                {() => <StackNavigators screenName="Feed" />}
            </Tabs.Screen>
            <Tabs.Screen 
                name="Search " 
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon iconName={"search"} color={color} focused={focused} />
                    )
                }}
            >
                {() => <StackNavigators screenName="Search" />}
            </Tabs.Screen>
            <Tabs.Screen 
                name="Camera" 
                component={View}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon iconName={"camera"} color={color} focused={focused} />
                    )
                }}
            />
            <Tabs.Screen 
                name="Notification " 
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon iconName={"heart"} color={color} focused={focused} />
                    )
                }}
            >
                {() => <StackNavigators screenName="Notification" />}
            </Tabs.Screen>
            <Tabs.Screen 
                name="MyPage " 
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        data?.me?.avatar ? (
                            <Image 
                                source={{ uri: data.me.avatar }}
                                style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
                                    ...(focused && { borderColor: "#ffffff", borderWidth: 1 })
                                }}
                            />
                        ) : (
                            <TabIcon iconName={"person"} color={color} focused={focused} />
                        )
                    )
                }}
            >
                {() => <StackNavigators screenName="MyPage" />}
            </Tabs.Screen>
        </Tabs.Navigator>
    );
};

export default LoggedInNav;
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import StackNavigators from "../components/nav/StackNavigators";
import TabIcon from "../components/nav/TabIcon";

import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notification from "../screens/Notification";
import Profile from "../screens/Profile";
import MyPage from "../screens/MyPage";

const Tabs = createBottomTabNavigator();

const LoggedInNav = () => {
    return (
        <Tabs.Navigator
            screenOptions={{
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
                name="Feed"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon iconName={"home"} color={color} focused={focused} />
                    )
                }}
            >
                {() => <StackNavigators screenName="Feed" />}
            </Tabs.Screen>
            <Tabs.Screen 
                name="Search" 
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
                component={Search}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon iconName={"camera"} color={color} focused={focused} />
                    )
                }}
            />
            <Tabs.Screen 
                name="Notification" 
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon iconName={"heart"} color={color} focused={focused} />
                    )
                }}
            >
                {() => <StackNavigators screenName="Notification" />}
            </Tabs.Screen>
            <Tabs.Screen 
                name="Profile" 
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon iconName={"person"} color={color} focused={focused} />
                    )
                }}
            >
                {() => <StackNavigators screenName="Profile" />}
            </Tabs.Screen>
        </Tabs.Navigator>
    );
};

export default LoggedInNav;
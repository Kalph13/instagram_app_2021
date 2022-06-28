import React from "react";
import { Ionicons } from "@expo/vector-icons";

const TabIcon = ({ iconName, color, focused }) => (
    <Ionicons name={iconName} color={color} size={focused ? 24 : 20} />
);

export default TabIcon;
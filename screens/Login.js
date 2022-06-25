import React from "react";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import { AuthInput } from "../components/auth/AuthShared";

const Login = ({ navigation }) => {
    return (
        <AuthLayout>
            <AuthInput 
                placeholder="Username"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                returnKeyType="next"
            />
            <AuthInput 
                placeholder="Password"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                returnKeyType="done"
                secureTextEntry
                lastOne={true}
            />
        </AuthLayout>
    )
};

export default Login;

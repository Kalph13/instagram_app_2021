import React from "react";
import styled from "styled-components";
import { colors } from "../colors";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";

const LoginLink = styled.Text`
    color: ${colors.blue};
    font-weight: 600;
    margin-top: 20px;
    text-align: center;
`;

const TouchableOpacity = styled.TouchableOpacity``;

const Welcome = ({ navigation }) => {
    const goToCreateAccount = () => navigation.navigate("CreateAccount");
    const goToLogin = () => navigation.navigate("Login");

    return (
        <AuthLayout>
            <AuthButton 
                onPress={goToCreateAccount}
                disabled={false}
                text="Create New Account"
            />
            <TouchableOpacity onPress={goToLogin}>
                <LoginLink>Log In</LoginLink>
            </TouchableOpacity>
        </AuthLayout>
    )
};

export default Welcome;

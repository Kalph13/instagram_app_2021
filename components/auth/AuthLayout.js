import React from "react";
import { Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import styled from "styled-components/native";

const Wrapper = styled.TouchableWithoutFeedback``;

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #000000;
    padding: 0px 40px;
`;

const Logo = styled.Image`
    max-width: 50%;
    width: 100%;
    height: 100px;
    margin: 0 auto;
    margin-bottom: 20px;
`;

const AuthLayout = ({ children }) => {
    const dismissKeyboard = () => {
        /* Dismiss the Active Keyboard and Remove Focus (https://docs.expo.dev/versions/latest/react-native/keyboard) */
        Keyboard.dismiss();
    };

    return (
        <Wrapper
            style={{ flex: 1 }}
            onPress={dismissKeyboard}
            disabled={Platform.OS === "web"}
        >
            <Container>
                <KeyboardAvoidingView
                    style={{
                        width: "100%",
                    }}
                    behavior="position"
                    keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
                >
                    <Logo resizeMode="contain" source={require("../../assets/logo.png")} />
                    {children}
                </KeyboardAvoidingView>
            </Container>
        </Wrapper>
    );
}

export default AuthLayout;

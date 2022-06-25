import React from "react";
import styled from "styled-components";

const Container = styled.View`

`;

const Text = styled.Text`

`;

const TouchableOpacity = styled.TouchableOpacity`

`;

const Login = ({ navigation }) => {
    return (
        <Container>
            <Text>Login</Text>
            <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
                <Text>Go to CreateAccount</Text>
            </TouchableOpacity>
        </Container>
    )
};

export default Login;

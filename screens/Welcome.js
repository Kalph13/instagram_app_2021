import React from "react";
import styled from "styled-components";

const Container = styled.View`

`;

const Text = styled.Text`

`;

const TouchableOpacity = styled.TouchableOpacity`

`;

const Welcome = ({ navigation }) => {
    return (
        <Container>
            <Text>Welcome</Text>
            <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
                <Text>Go to CreateAccount</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text>Go to Login</Text>
            </TouchableOpacity>
        </Container>
    )
};

export default Welcome;

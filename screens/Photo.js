import React from "react";
import styled from "styled-components";

const Container = styled.View`
    flex: 1;
    background-color: #000000;
    align-items: center;
    justify-content: center;
`;

const TouchableOpacity = styled.TouchableOpacity`
    
`;

const Text = styled.Text`
    color: #ffffff;
`;

const Photo = ({ navigation }) => {
    return (
        <Container>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Text>Photo: Move to Profile</Text>
            </TouchableOpacity>
        </Container>
    );
};

export default Photo;

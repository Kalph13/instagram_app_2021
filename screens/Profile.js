import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.View`
    flex: 1;
    background-color: #000000;
    align-items: center;
    justify-content: center;
`;

const Text = styled.Text`
    color: #ffffff;
`;

const Profile = ({ navigation, route }) => {
    useEffect(() => {
        if (route?.params?.username) {
            navigation.setOptions({
                title: route.params.username
            });
        }
    });

    return (
        <Container>
            <Text>Profile</Text>
        </Container>
    );
};

export default Profile;

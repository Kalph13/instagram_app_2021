import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";

const Container = styled.View`
    flex: 1;
    background-color: #000000;
    align-items: center;
    justify-content: center;
`;

const ScreenLayout = ({ loading, children }) => {
    return (
        <Container>
            {loading ? <ActivityIndicator color="white" /> : children}
        </Container>
    );
};

export default ScreenLayout;

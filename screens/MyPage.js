import React from "react";
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

const MyPage = () => {
    return (
        <Container>
            <Text>MyPage</Text>
        </Container>
    );
};

export default MyPage;

import React, { useEffect } from "react";
import styled from "styled-components";
import useFindMe from "../hooks/useFindMe";

const Container = styled.View`
    flex: 1;
    background-color: #000000;
    align-items: center;
    justify-content: center;
`;

const Text = styled.Text`
    color: #ffffff;
`;

const MyPage = ({ navigation }) => {
    const { data } = useFindMe();

    useEffect(() => {
        navigation.setOptions({
            title: data?.findMe?.username
        })
    }, []);

    return (
        <Container>
            <Text>MyPage</Text>
        </Container>
    );
};

export default MyPage;

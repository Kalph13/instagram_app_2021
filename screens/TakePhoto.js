import React, { useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components";

const Container = styled.View`
    flex: 1;
    background-color: #000000;
`;

const Top = styled.View`
    flex: 1;
    background-color: #000000;
`;

const Bottom = styled.View`
    flex: 1;
    background-color: #000000;
`;

const TakePhoto = () => {
    return (
        <Container>
            <Top />
            <Bottom />
        </Container>
    );
};

export default TakePhoto;

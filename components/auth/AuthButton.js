import React from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";

const Button = styled.TouchableOpacity`
    width: 100%;
    background-color: ${colors.blue};
    padding: 15px 10px;
    border-radius: 3px;
    opacity: ${props => props.disabled ? "0.5" : "1"};
`;

const ButtonText = styled.Text`
    color: white;
    font-weight: 600;
    text-align: center;
`;

const AuthButton = ({ onPress, disabled, text }) => {
    return (
        <Button disabled={disabled} onPress={onPress}>
            <ButtonText>{text}</ButtonText>
        </Button>
    );
};

export default AuthButton;


import styled from "styled-components";

export const AuthInput = styled.TextInput`
    width: 100%;
    background-color: rgba(255, 255, 255, 0.15);
    padding: 10px 15px;
    border-radius: 5px;
    color: #ffffff;
    margin-bottom: ${props => props.lastOne ? 20 : 15}px;
`;

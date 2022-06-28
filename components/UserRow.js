import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import { colors } from "../colors";

const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
`;

const Column = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;

const Avatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 25px;
    margin-left: 10px;
`;

const Username = styled.Text`
    font-weight: bold;
    color: #ffffff;
`;

const FollowButton = styled.TouchableOpacity`
    background-color: ${colors.blue};
    justify-content: center;
    padding: 5px 10px;
    border-radius: 4px;
`;

const FollowButtonText = styled.Text`
    color: #ffffff;
    font-weight: bold;
`;

const UserRow = ({ id, avatar, username, isFollowing, isMe }) => {
    const navigation = useNavigation();

    return (
        <Wrapper>
            <Column onPress={() => navigation.navigate("Profile", { id, username })}>
                <Avatar source={{ uri: avatar }} />
                <Username>{username}</Username>
            </Column>
            {!isMe ? (
                <FollowButton>
                    <FollowButtonText>{isFollowing ? "Unfollow" : "Follow"}</FollowButtonText>
                </FollowButton>
            ) : null}
        </Wrapper>
    );
};

export default UserRow;

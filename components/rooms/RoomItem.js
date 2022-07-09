import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import { colors } from "../../colors";
import useFindMe from "../../hooks/useFindMe";

const RoomContainer = styled.TouchableOpacity`
    flex-direction: row;
    width: 100%;
    padding: 15px 10px;
    align-items: center;
    justify-content: space-between;
`;

const Column = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const Avatar = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-right: 20px;
`;

const Data = styled.View``;

const UnreadDot = styled.View`
    margin-right: 10px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${colors.blue};
`;

const Username = styled.Text`
    color: #ffffff;
    font-weight: bold;
    font-size: 16px;
`;

const UnreadText = styled.Text`
    color: #ffffff;
    margin-top: 2px;
    font-weight: bold;
`;

const RoomItem = ({ users, unreadTotal, id }) => {
    const { data: findMeData } = useFindMe();
    const navigation = useNavigation();

    const messageTo = users.find(
        user => user.username !== findMeData?.findMe?.username
    );

    const goToRoom = () => navigation.navigate("Room", {
        id,
        messageTo
    });

    return (
        <RoomContainer onPress={goToRoom}>
            <Column>
                <Avatar source={{ uri: messageTo.avatar }} />
                <Data>
                    <Username>{messageTo.username}</Username>
                    <UnreadText>
                        {unreadTotal} unread{" "}
                        {unreadTotal === 1 ? "message" : "messages"}
                    </UnreadText>
                </Data>
            </Column>
            <Column>
                {unreadTotal !== 0 ? <UnreadDot /> : null}
            </Column>
        </RoomContainer>
    );
};

export default RoomItem;

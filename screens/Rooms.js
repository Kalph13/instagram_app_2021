import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { ROOM_FRAGMENT } from "../fragments";
import styled from "styled-components";
import ScreenLayout from "../components/ScreenLayout";
import RoomItem from "../components/rooms/RoomItem";

const SEE_ROOMS_QUERY = gql`
    query SeeRooms {
        seeRooms {
            ...RoomFragment
        }
    }
    ${ROOM_FRAGMENT}
`;

const Text = styled.Text`
    color: #ffffff;
`;

const Separator = styled.View`
    width: 100%;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.2);
`;

const FlatList = styled.FlatList`
    width: 100%;
`;

const Rooms = () => {    
    const { data, loading } = useQuery(SEE_ROOMS_QUERY);
        
    const renderItem = ({ item: room }) => <RoomItem {...room} />;

    return (
        <ScreenLayout loading={loading}>
            {data === undefined || data.seeRooms.length === 0 ? <Text>No message</Text> : 
            <FlatList 
                data={data?.seeRooms}
                keyExtractor={room => "" + room.id}
                renderItem={renderItem}
                ItemSeparatorComponent={<Separator />}
            />}
        </ScreenLayout>
    );
};

export default Rooms;

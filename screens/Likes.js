import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { USER_FRAGMENT } from "../fragments";
import styled from "styled-components";
import ScreenLayout from "../components/ScreenLayout";
import UserRow from "../components/UserRow";

const SEE_PHOTO_LIKES_QUERY = gql`
    query SeePhotoLikes($seePhotoLikesId: Int!) {
        seePhotoLikes(id: $seePhotoLikesId) {
            ...UserFragment
        }
    }
    ${USER_FRAGMENT}
`;

const FlatList = styled.FlatList`
    width: 100%;
`;

const Separator = styled.View`
    width: 100%;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.2);
`;

const Likes = ({ route }) => {
    const [ refreshing, setRefreshing ] = useState(false);
    
    const { data, loading, refetch } = useQuery(SEE_PHOTO_LIKES_QUERY, {
        variables: {
            seePhotoLikesId: route?.params?.photoID
        },
        skip: !route?.params?.photoID
    });

    const renderUser = ({ item: user }) => <UserRow {...user} />;

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    return (
        <ScreenLayout loading={loading}>
            <FlatList 
                refreshing={refreshing}
                onRefresh={onRefresh}
                data={data?.seePhotoLikes}
                keyExtractor={item => "" + item.id}
                renderItem={renderUser}
                ItemSeparatorComponent={Separator}
            />
        </ScreenLayout>
    );
};

export default Likes;

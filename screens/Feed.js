import React from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";
import { FlatList } from "react-native";

const FEED_QUERY = gql`
    query SeeFeed($offset: Int!) {
        seeFeed(offset: $offset) {
            ...PhotoFragment,
            user {
                username
                avatar
            }
            caption
            comments { 
                ...CommentFragment
            }
            createdAt
            isMine
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
`;

const Container = styled.View`
    
`;

const Text = styled.Text`
    color: #ffffff;
`;

const Feed = () => {
    const { data, loading } = useQuery(FEED_QUERY, {
        variables: {
            offset: 0
        }
    })

    const renderPhoto = ({ item: photo }) => {
        return (
            <Container>
                <Text>{photo.caption}</Text>
            </Container>
        )
    };

    return (
        <ScreenLayout loading={loading}>
            <FlatList 
                data={data?.seeFeed}
                keyExtractor={photo => "" + photo.id}
                renderItem={renderPhoto}
            />
        </ScreenLayout>
    );
};

export default Feed;

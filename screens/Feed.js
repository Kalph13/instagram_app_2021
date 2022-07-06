import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";
import Photo from "../components/Photo";

const FEED_QUERY = gql`
    query SeeFeed($offset: Int!) {
        seeFeed(offset: $offset) {
            ...PhotoFragment,
            user {
                id
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

const FlatList = styled.FlatList`
    width: 100%;
`;

const TouchableOpacity = styled.TouchableOpacity`
    margin-right: 25px;
`;

const Feed = ({ navigation }) => {
    const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
        variables: {
            offset: 0
        }
    })

    const renderPhoto = ({ item: photo }) => {
        return <Photo {...photo} />;
    };

    const [ refreshing, setRefreshing ] = useState(false);

    const refreshPhoto = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const messageButton = () => (
        <TouchableOpacity
            onPress={() => navigation.navigate("MessageNav")}
        >
            <Ionicons name="paper-plane" color="white" size={20} />
        </TouchableOpacity>
    );

    useEffect(() => {
        navigation.setOptions({
            headerRight: messageButton
        })
    }, []);

    return (
        <ScreenLayout loading={loading}>
            <FlatList 
                data={data?.seeFeed}
                keyExtractor={photo => "" + photo.id}
                renderItem={renderPhoto}
                showVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={refreshPhoto}
                onEndReachedThreshold={0.05}
                onEndReached={() => fetchMore({
                    variables: {
                        offset: data?.seeFeed?.length
                    }
                })}
            />
        </ScreenLayout>
    );
};

export default Feed;

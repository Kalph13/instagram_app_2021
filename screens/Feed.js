import React, { useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";
import Photo from "./Photo";

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

const FlatList = styled.FlatList`
    width: 100%;
`;

const Feed = () => {
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

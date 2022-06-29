import React, { useState} from "react";
import { gql, useQuery } from "@apollo/client";
import { RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { PHOTO_FRAGMENT } from "../fragments";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";

const SEE_PHOTO_QUERY = gql`
    query SeePhoto($seePhotoId: Int!) {
        seePhoto(id: $seePhotoId) {
            ...PhotoFragment
            user {
                id
                username
                avatar
            }
            caption
        }
    }
    ${PHOTO_FRAGMENT}
`;

const SeePhoto = ({ route }) => {
    const { data, loading, refetch } = useQuery(SEE_PHOTO_QUERY, {
        variables: {
            seePhotoId: route?.params?.photoID
        }
    });

    const [ refreshing, setRefreshing ] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    return (
        <ScreenLayout loading={loading}>
            <ScrollView
                refreshControl={
                    <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                }
                style={{
                    backgroundColor: "#000000"
                }}
                contentContainerStyle={{
                    backgroundColor: "#000000",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Photo {...data?.seePhoto} />
            </ScrollView>
        </ScreenLayout>
    );
};

export default SeePhoto;

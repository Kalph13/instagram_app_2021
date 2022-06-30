import React, { useState, useEffect } from "react";
import { useWindowDimensions, StatusBar, TouchableOpacity, Image, FlatList } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors";

/* Media Library: Access to User's Images and Videos (https://docs.expo.dev/versions/v45.0.0/sdk/media-library) */
import * as MediaLibrary from "expo-media-library";

const Container = styled.View`
    flex: 1;
    background-color: #000000;
`;

const Top = styled.View`
    flex: 1;
    background-color: #000000;
`;

const Bottom = styled.View`
    flex: 1;
    background-color: #000000;
`;

const IconContainer = styled.View`
    position: absolute;
    bottom: 5px;
    right: 0px;
`;

const HeaderRightText = styled.Text`
    color: ${colors.blue};
    font-size: 16px;
    font-weight: 600;
    margin-right: 7px;
`;

const SelectPhoto = ({ navigation }) => {
    const [ permitted, setPermitted ] = useState(false);
    const [ photos, setPhotos ] = useState([]);
    const [ selectedPhoto, setSelectedPhoto ] = useState("");

    const numColumns = 3;
    const { width } = useWindowDimensions();

    const getPhotos = async () => {
        if (permitted) {
            const { assets: photos } = await MediaLibrary.getAssetsAsync();
            setPhotos(photos);
            setSelectedPhoto(photos[0]?.uri);
        }
    };

    const getPermission = async () => {
        const {
            granted,
            canAskAgain
        } = await MediaLibrary.getPermissionsAsync();

        if (granted === false && canAskAgain) {
            const { granted } = await MediaLibrary.requestPermissionsAsync();

            if (granted === true) {
                setPermitted(true);
                /* This Doesn't Work Well (getPhoto() is Called Before setPermitted() is Finished), So Moved getPhoto() in the separate useEffect() */
                /* getPhotos(); */
            }
        } else if (granted === true) {
            setPermitted(true);
            /* This Doesn't Work Well (getPhoto() is Called Before setPermitted() is Finished), So Moved getPhoto() in the separate useEffect() */
            /* getPhotos(); */
        }
    };

    const selectPhoto = uri => {
        setSelectedPhoto(uri);
    };

    const renderItem = ({ item: photo }) => (
        <TouchableOpacity onPress={() => selectPhoto(photo.uri)}>
            <Image 
                source={{ uri: photo.uri }}
                style={{ width: width / numColumns, height: width / numColumns }}
            />
            <IconContainer>
                <Ionicons name="checkmark-circle" size={18} color={photo.uri === selectedPhoto ? colors.blue : "white"} />
            </IconContainer>
        </TouchableOpacity>
    );

    const HeaderRight = () => (
        <TouchableOpacity>
            <HeaderRightText>Next</HeaderRightText>
        </TouchableOpacity>
    );

    useEffect(() => {
        getPermission();
        navigation.setOptions({
            headerRight: HeaderRight
        });
    }, []);

    useEffect(() => {
        getPhotos();
    }, [permitted]);

    return (
        <Container>
            <StatusBar />
            <Top>
                {selectedPhoto !== "" ? (
                    <Image 
                        source={{ uri: selectedPhoto }}
                        style={{ width, height: "100%" }}
                    />
                ) : null}
            </Top>
            <Bottom>
                <FlatList 
                    data={photos}
                    numColumns={numColumns}
                    keyExtractor={photo => "" + photo.id}
                    renderItem={renderItem}
                />
            </Bottom>
        </Container>
    );
};

export default SelectPhoto;

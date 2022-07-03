import React, { useEffect } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { FEED_PHOTO } from "../fragments";
import { ReactNativeFile } from "apollo-upload-client";
import styled from "styled-components";
import { colors } from "../colors";
import DismissKeyboard from "../components/DismissKeyboard";

const UPLOAD_PHOTO_MUTATION = gql`
    mutation UploadPhoto($file: Upload!, $caption: String) {
        uploadPhoto(file: $file, caption: $caption) {
            ...FeedPhoto
        }
    }
    ${FEED_PHOTO}
`;

const Container = styled.View`
    flex: 1;
    background-color: #000000;
    padding: 0px 50px;
`;

const Photo = styled.Image`
    height: 350px;
`;

const CaptionContainer = styled.View`
    margin-top: 30px;
`;

const Caption = styled.TextInput`
    background-color: #ffffff;
    color: #000000;
    padding: 10px 20px;
    border-radius: 100px;
`;

const HeaderRightText = styled.Text`
    color: ${colors.blue};
    font-size: 16px;
    font-weight: bold;
    margin-right: 7px;
`;

const UploadForm = ({ route, navigation }) => {
    const [ uploadPhotoMutation, { data, loading, error }] = useMutation(UPLOAD_PHOTO_MUTATION);

    const HeaderRight = () => (
        <TouchableOpacity onPress={handleSubmit(onValid)}>
            <HeaderRightText>Next</HeaderRightText>
        </TouchableOpacity>
    );
    
    const HeaderRightLoading = () => (
        <ActivityIndicator color="#ffffff" size="small" style={{ marginRight: 10 }} />
    );

    const { register, handleSubmit, setValue } = useForm();

    const onValid = ({ caption }) => {
        const file = new ReactNativeFile({
            uri: route.params.file,
            name: "a.jpg",
            type: "image/jpeg"
        });

        console.log("File", file);
        console.log("Caption", caption);

        uploadPhotoMutation({
            variables: {
                file,
                caption
            }
        });
    };

    useEffect(() => {
        register("caption");
    }, [register]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: loading ? HeaderRightLoading : HeaderRight,
            ...(loading && { headerLeft: () => null })
        });
    }, [loading]);

    console.log("uploadPhotoMutation Data", data);
    console.log("uploadPhotoMutation Error", error);

    return (
        <DismissKeyboard>
            <Container>
                <Photo resizeMode="contain" source={{ uri: route.params.file }} />
                <CaptionContainer>
                    <Caption 
                        returnKeyType="done"
                        placeholder="Write a caption..."
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        onSubmitEditing={handleSubmit(onValid)}
                        onChangeText={text => setValue("caption", text)}
                    />
                </CaptionContainer>
            </Container>
        </DismissKeyboard>
    ); 
};

export default UploadForm;

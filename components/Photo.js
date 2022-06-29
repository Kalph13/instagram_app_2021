import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useWindowDimensions, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

const TOGGLE_LIKE_MUTATION = gql`
    mutation ToggleLike($toggleLikeId: Int!) {
        toggleLike(id: $toggleLikeId) {
            toggleLikeSucceed
            toggleLikeError
        }
    }
`;

const Container = styled.View``;

const Header = styled.TouchableOpacity`
    flex-direction: row;
    padding: 10px;
    align-items: center;
`;

const UserAvatar = styled.Image`
    width: 25px;
    height: 25px;
    margin-right: 10px;
    border-radius: 12.5px;
`;

const TouchableOpacity = styled.TouchableOpacity``;

const Username = styled.Text`
    color: #ffffff;
    font-weight: bold;
`;

const File = styled.Image``;

const ActionContainer = styled.View`
    padding: 10px;
`;

const Actions = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Action = styled.TouchableOpacity`
    margin-right: 10px;
`;

const Caption = styled.View`
    flex-direction: row;
`;

const CaptionText = styled.Text`
    color: #ffffff;
    margin-left: 5px;
`;

const Likes = styled.Text`
    color: #ffffff;
    margin: 7px 0px;
    font-weight: bold;
`;

const Photo = ({ id, user, caption, file, isLiked, likes }) => {
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions();
    const [ imageHeight, setImageHeight ] = useState(height - 450);

    useEffect(() => {
        Image.getSize(file, (width, height) => {
            setImageHeight(height / 3);
        });
    }, [file]);

    const updateToggleLike = (cache, result) => {
        const {
            data: {
                toggleLike: {
                    toggleLikeSucceed
                }
            }
        } = result;

        if (toggleLikeSucceed) {
            const photoID = `Photo:${id}`;

            cache.modify({
                id: photoID,
                fields: {
                    isLiked(prev) {
                        return !prev;
                    },
                    likes(prev) {
                        if (isLiked) {
                            return prev - 1;
                        }
                        return prev + 1;
                    }
                }
            });
        }
    };

    const [ toggleLikeMutation ] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: {
            toggleLikeId: id
        },
        update: updateToggleLike
    });

    const goToProfile = () => {
        navigation.navigate("Profile", {
            id: user.id,
            username: user.username
        });
    };

    return (
        <Container>
            <Header onPress={goToProfile}>
                <UserAvatar resizeMode="cover" source={{ uri: user.avatar }} />
                <Username>{user.username}</Username>
            </Header>
            <File 
                resizeMode="cover"
                style={{
                    width,
                    height: imageHeight
                }}
                source={{ uri: file }}
            />
            <ActionContainer>
                <Actions>
                    <Action onPress={toggleLikeMutation}>
                        <Ionicons 
                            name={isLiked ? "heart" : "heart-outline"}
                            color={isLiked ? "tomato" : "white"}
                            size={22}
                        />
                    </Action>
                    <Action onPress={() => navigation.navigate("Comments")}>
                        <Ionicons name="chatbubble-outline" color="white" size={22} />
                    </Action>
                </Actions>
                <TouchableOpacity onPress={() => navigation.navigate("Likes", { photoID: id })}>
                    <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
                </TouchableOpacity>
                <Caption>
                    <TouchableOpacity onPress={goToProfile}>
                        <Username>{user.username}</Username>
                    </TouchableOpacity>
                    <CaptionText>{caption}</CaptionText>
                </Caption>
            </ActionContainer>
        </Container>
    );
};

Photo.propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
    }),
    caption: PropTypes.string,
    file: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired,
    commentsNumber: PropTypes.number,
}

export default Photo;

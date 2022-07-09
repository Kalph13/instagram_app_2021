import React, { useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import styled from "styled-components";
import ScreenLayout from "../components/ScreenLayout";
import { useForm } from "react-hook-form";
import useFindMe from "../hooks/useFindMe";
import { Ionicons } from "@expo/vector-icons";

const SEE_ROOM_QUERY = gql`
    query seeRoom($id: Int!) {
        seeRoom(id: $id) {
            id
            messages {
                id
                payload
                user {
                    username
                    avatar
                }
                read
            }
        }
    }
`;

const SEND_MESSAGE_MUTATION = gql`
    mutation SendMessage($payload: String!, $userId: Int, $roomId: Int) {
        sendMessage(payload: $payload, userID: $userId, roomID: $roomId) {
            sendMessageSucceed
            sendMessageID
            sendMessageError
        }
    }
`;

const MessageContainer = styled.View`
    flex-direction: ${props => props.outGoing ? "row-reverse" : "row" };
    padding: 0px 10px;
    align-items: flex-end;
`;

const Author = styled.View``;

const Avatar = styled.Image`
    width: 20px;
    height: 20px;
    border-radius: 25px;
`;

const Message = styled.Text`
    margin: 0px 10px;
    padding: 5px 10px;
    border-radius: 10px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.3);
    color: #ffffff;
    font-size: 16px;
`;

const InputContainer = styled.View`
    flex-direction: row;
    width: 95%;
    margin-top: 25px;
    margin-bottom: 25px;
    align-items: center;
`;

const TextInput = styled.TextInput`
    width: 90%;
    margin-right: 10px;
    padding: 10px 20px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 50px;
    color: #ffffff;
`;

const SendButton = styled.TouchableOpacity``;

const FlatList = styled.FlatList`
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: #000000;
`;

const Separator = styled.View`
    height: 20px;
`;

const Room = ({ route, navigation }) => {
    const { data: findMeData } = useFindMe();
    const { register, handleSubmit, setValue, getValues, watch } = useForm();

    const updateSendMessage = (cache, result) => {
        const {
            data: {
                sendMessage: {
                    sendMessageSucceed,
                    sendMessageID
                }
            }
        } = result;

        if (sendMessageSucceed && findMeData) {
            const { message } = getValues();
            setValue("message", "");
            
            const messageObj = {
                id: sendMessageID,
                payload: message,
                user: {
                    username: findMeData.findMe.username,
                    avatar: findMeData.findMe.avatar
                },
                read: true,
                __typename: "Message"
            };

            const messageFragment = cache.writeFragment({
                id: `Message:${sendMessageID}`,
                fragment: gql`
                    fragment NewMessage on Message {
                        id
                        payload
                        user {
                            username
                            avatar
                        }
                        read
                    }
                `,
                data: messageObj
            });

            cache.modify({
                id: `Room:${route.params.id}`,
                fields: {
                    messages(prev) {
                        return [...prev, messageFragment];
                    }
                }
            });
        }
    };

    const [ sendMessageMutation, { loading: sendMessageLoading }] = useMutation(SEND_MESSAGE_MUTATION, {
        update: updateSendMessage
    });

    const { data, loading } = useQuery(SEE_ROOM_QUERY, {
        variables: {
            id: route?.params?.id
        }
    });

    const onValid = ({ message }) => {
        if (!sendMessageLoading) {
            sendMessageMutation({
                variables: {
                    payload: message,
                    roomId: route?.params?.id
                }
            })
        }
    };

    useEffect(() => {
        register("message", { required: true });
    }, [register])

    useEffect(() => {
        navigation.setOptions({
            title: `${route?.params?.messageTo?.username}`
        })
    }, []);

    const renderItem = ({ item: message }) => (
        <MessageContainer
            outGoing={message.user.username !== route?.params?.messageTo?.username}
        >
            <Author>
                <Avatar source={{ uri: message.user.avatar }} />
            </Author>
            <Message>{message.payload}</Message>
        </MessageContainer>
    );

    /* ?? (Nullish Coalescing Operator): https://seo-tory.tistory.com/38 */
    const messageList = [...(data?.seeRoom?.messages ?? [])];
    messageList.reverse();

    return (
        <KeyboardAvoidingView
            behavior="height"
            keyboardVerticalOffset={50}
        >
            <ScreenLayout loading={loading}>
                <FlatList
                    inverted 
                    data={messageList}
                    keyExtractor={message => "" + message.id}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <Separator />}
                    showVerticalScrollIndicator={false}
                />
                <InputContainer>
                    <TextInput 
                        placeholder="Write a message..."
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        returnKeyLabel="Send Message"
                        returnKeyType="send"
                        onChangeText={text => setValue("message", text)}
                        onSubmitEditing={handleSubmit(onValid)}
                        value={watch("message")}
                    />
                    <SendButton
                        onPress={handleSubmit(onValid)}
                        disabled={!Boolean(watch("message"))}
                    >
                        <Ionicons 
                            name="send"
                            color={!Boolean(watch("message")) ? "rgba(255, 255, 255, 0.5)" : "#ffffff"}
                            size={24}
                        />
                    </SendButton>
                </InputContainer>
            </ScreenLayout>
        </KeyboardAvoidingView>
    );
};

export default Room;

import React, { useEffect } from "react";
import { ActivityIndicator, useWindowDimensions, Image } from "react-native";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import DismissKeyboard from "../components/DismissKeyboard";

/* useLazyQuery: Not Immediately Run and Re-render (https://www.apollographql.com/docs/react/data/queries/#manual-execution-with-uselazyquery) */
import { gql, useLazyQuery } from "@apollo/client";

const SEARCH_PHOTOS = gql`
    query SearchPhotos($keyword: String!) {
        searchPhotos(keyword: $keyword) {
            id
            file
        }
    }
`;

const Container = styled.View`
    flex: 1;
    background-color: #000000;
`;

const SearchContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const SearchText = styled.Text`
    color: #ffffff;
    margin-top: 15px;
    font-weight: bold;
`;

const TextInput = styled.TextInput`
    background-color: rgba(255, 255, 255, 1);
    color: #000000;
    width: ${props => props.width / 1.5}px;
    padding: 5px 10px;
    border-radius: 7px;
`;

const FlatList = styled.FlatList``;
const TouchableOpacity = styled.TouchableOpacity`
    background-color: #333333;
`;

const Search = ({ navigation }) => {
    const { register, handleSubmit, setValue, watch } = useForm();
    const [ startQueryFn, { loading, data, called } ] = useLazyQuery(SEARCH_PHOTOS);
    
    const numColumns = 3;
    const { width } = useWindowDimensions();

    const onValid = ({ keyword }) => {
        startQueryFn({
            variables: {
                keyword
            }
        })
    };

    const SearchBox = () => (
        <TextInput 
            width={width}
            style={{ backgroundColor: "#ffffff" }}
            placeholderTextColor="rgba(0, 0, 0, 0.8)"
            placeholder="Search Photo"
            autoCapitalize="none"
            returnKeyLabel="Search"
            returnKeyType="search"
            autoCorrect={false}
            onChangeText={text => setValue("keyword", text)}
            onSubmitEditing={handleSubmit(onValid)}
        />
    );

    useEffect(() => {
        navigation.setOptions({
            headerTitle: SearchBox
        });
        
        register("keyword", {
            required: true,
            minLength: 3
        });
    }, []);

    const renderItem = ({ item: photo }) => (
        <TouchableOpacity onPress={() => navigation.navigate("SeePhoto", { photoID: photo.id })}>
            <Image
                source={{ uri: photo.file }}
                style={{ width: width / numColumns, height: width / numColumns }}
            />
        </TouchableOpacity>
    );

    return (
        <DismissKeyboard>
            <Container>
                {loading ? (
                    <SearchContainer>
                        <ActivityIndicator size="large" />
                        <SearchText>Searching...</SearchText>
                    </SearchContainer>
                ) : null}
                {!called ? (
                    <SearchContainer>
                        <SearchText>Search by keyword</SearchText>
                    </SearchContainer>
                ) : null}
                {data?.searchPhotos !== undefined ? (
                    data?.searchPhotos?.length === 0 ? (
                        <SearchContainer>
                            <SearchText>Could not find anything</SearchText>
                        </SearchContainer>
                    ) : ( 
                        <FlatList 
                            numColumns={numColumns}
                            data={data?.searchPhotos}
                            keyExtractor={photo => "" + photo.id}
                            renderItem={renderItem}
                        />
                    )
                ) : null}
            </Container>
        </DismissKeyboard>
    );
};

export default Search;

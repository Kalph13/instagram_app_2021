import React, { useState, useEffect, useRef } from "react";
import { Alert, StatusBar, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

/* React Native Slider: https://www.npmjs.com/package/@react-native-community/slider */
import Slider from "@react-native-community/slider";

const Container = styled.View`
    flex: 1;
    background-color: #000000;
`;

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    top: 20px;
    left: 20px;
`;

const Actions = styled.View`
    flex: 0.35;
    padding: 0px 35px;
    align-items: center;
    justify-content: space-evenly;
`;

const SliderContainer = styled.View``;

const ButtonContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const TakePhotoButton = styled.TouchableOpacity`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    background-color: rgba(255, 255, 255, 0.5);
    border: 2px solid rgba(255, 255, 255, 0.8);
`;

const PhotoActions = styled(Actions)`
    flex-direction: row;
`;

const PhotoAction = styled.TouchableOpacity`
    background-color: white;
    border-radius: 4px;
    padding: 10px 25px;
`;

const PhotoActionText = styled.Text`
    font-weight: 600;
`;

const TakePhoto = ({ navigation }) => {
    const camera = useRef();
    const [ cameraReady, setCameraReady ] = useState(false);
    const [ permitted, setPermitted ] = useState(false);
    const [ cameraType, setCameraType ] = useState(Camera.Constants.Type.back);
    const [ flashMode, setFlashMode ] = useState(Camera.Constants.FlashMode.off);
    const [ zoom, setZoom ] = useState(0);
    const [ takenPhoto, setTakenPhoto ] = useState("");

    const getPermission = async () => {
        const { granted } = await Camera.requestCameraPermissionsAsync();
        setPermitted(granted);
        console.log("permitted", permitted);
    };

    const onCameraReady = () => {
        setCameraReady(true);
        console.log("cameraReady", cameraReady);
    }

    const onCameraSwitch = () => {
        if (cameraType === Camera.Constants.Type.front) {
            setCameraType(Camera.Constants.Type.back);
        } else {
            setCameraType(Camera.Constants.Type.front);
        }
    };

    const onFlashChange = () => {
        if (flashMode === Camera.Constants.FlashMode.off) {
            setFlashMode(Camera.Constants.FlashMode.on);
        } else if (flashMode === Camera.Constants.FlashMode.on) {
            setFlashMode(Camera.Constants.FlashMode.auto);
        } else if (flashMode === Camera.Constants.FlashMode.auto) {
            setFlashMode(Camera.Constants.FlashMode.off);
        }
    };

    const onZoomChange = event => {
        setZoom(event);
    };

    const takePhoto = async () => {
        if (camera.current && cameraReady) {
            const { uri } = await camera.current.takePictureAsync({
                quality: 1,
                exif: true
            });
            setTakenPhoto(uri);
        }
    };

    const onDismiss = () => setTakenPhoto("");

    const onUploadAsync = async (save) => {
        if (save) {
            await MediaLibrary.saveToLibraryAsync(takenPhoto);
        }
        console.log("onUploadAsync", takenPhoto);
    }

    const onUpload = () => {
        Alert.alert("Save photo?", "Save and upload the photo, or just upload", [
            {
                text: "Save and Upload",
                onPress: () => onUploadAsync(true)
            },
            {
                text: "Just Upload",
                onPress: () => onUploadAsync(false)
            }
        ]);
    };

    useEffect(() => {
        navigation.addListener("tabPress", () => {
            getPermission();
        })
    }, [navigation]);

    return (
        <Container>
            <StatusBar hidden={true} />
            {takenPhoto === "" ? ( 
                <Camera type={cameraType} style={{ flex: 1 }} flashMode={flashMode} zoom={zoom} ref={camera} onCameraReady={onCameraReady}>
                    <CloseButton onPress={() => navigation.navigate("BottomTabNav")}>
                        <Ionicons name="close" color="white" size={30} />
                    </CloseButton>
                </Camera>
            ) : ( 
                <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
            )}
            {takenPhoto === "" ? (
                <Actions>
                    <SliderContainer>
                        <Slider 
                            style={{ width: 200, height: 20 }}
                            value={zoom}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor="#ffffff"
                            maximumTrackTintColor="#ffffff"
                            thumbTintColor="#ffffff"
                            onValueChange={onZoomChange}
                        />
                    </SliderContainer>
                    <ButtonContainer>
                        <TouchableOpacity onPress={onFlashChange}>
                            <Ionicons 
                                name={
                                    flashMode === Camera.Constants.FlashMode.off ? "flash-off" :
                                    flashMode === Camera.Constants.FlashMode.on ? "flash" :
                                    flashMode === Camera.Constants.FlashMode.auto ? "eye" : ""
                                }
                                color="white"
                                size={35}
                            />
                        </TouchableOpacity>
                        <TakePhotoButton onPress={takePhoto} />
                        <TouchableOpacity onPress={onCameraSwitch}>
                            <Ionicons 
                                name={cameraType === Camera.Constants.Type.front ? "camera-reverse" : "camera"}
                                color="white"
                                size={35}
                            />
                        </TouchableOpacity>
                    </ButtonContainer>
                </Actions>
            ) : (
                <PhotoActions>
                    <PhotoAction onPress={onDismiss}>
                        <PhotoActionText>Dismiss</PhotoActionText>
                    </PhotoAction>
                    <PhotoAction onPress={onUpload}>
                        <PhotoActionText>Upload</PhotoActionText>
                    </PhotoAction>
                </PhotoActions>
            )}
        </Container>
    );
};

export default TakePhoto;

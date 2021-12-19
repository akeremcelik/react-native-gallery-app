import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Image, ActivityIndicator } from 'react-native';
import Modal from "react-native-modal";
import { Ionicons } from '@expo/vector-icons';

import { observer } from "mobx-react-lite";
import imageStore from "../helpers/store/imageStore";
import imagePicker from './../helpers/imagePicker';

import {Picker} from '@react-native-picker/picker';
import storage from './../helpers/firebase/storage';
import albumsStore from '../helpers/store/albumsStore';

const AddPhotoModal = ({hideModal, addPhotoModalVisibility}) => {
    const [album, setAlbum] = useState(0);
    const [activityIndicator, setActivityIndicator] = useState(false);
    useEffect(() => {
        setAlbum(0);
        imageStore.setImage(null);
    }, []);

    useEffect(() => {
        imageStore.setAlbumID(album);
    }, [album]);

    const uploadImageEvent = async () => {
        setActivityIndicator(true);
        let result = await storage.uploadImage();
        if(result === true) {
            hideModal();
        }
        setActivityIndicator(false);
    }

    const hideDependingState = () => {
        if(!activityIndicator)
            hideModal();
    }

    return (
        <View>
            <Modal
                isVisible={addPhotoModalVisibility}
                onBackButtonPress={hideDependingState}
                onBackdropPress={hideDependingState}
                animationIn={"zoomIn"}
                animationOut={"zoomOut"}
                animationInTiming={500}
                animationOutTiming={500}>
                {!activityIndicator ?
                <View style={styles.insiderView}>
                    <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
                        <Ionicons name="close-circle-sharp" size={30} color="brown" />
                    </TouchableOpacity>
                    <Text style={styles.header}>Upload Photo</Text>

                    <View style={{marginTop: 20}}>
                        <Text>Album</Text>
                        <View style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 10}}>
                            <Picker
                            selectedValue={album}
                            onValueChange={(itemValue, itemIndex) =>
                                setAlbum(itemValue)
                            }
                            mode="dropdown">
                                {albumsStore.albums.map((album) => <Picker.Item label={album.name} value={album.id} key={album.id} />)}
                            </Picker>
                        </View>

                        <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Button title="Pick an image" onPress={imagePicker.pickImage} color="orange" />
                            {imageStore.image && <Image source={{ uri: imageStore.image }} style={styles.image} />}
                        </View>
                    </View>

                    <View style={{position: 'absolute', bottom: 20, right: 20}}>
                        <Button title="Upload" onPress={uploadImageEvent} color="tomato" />
                    </View>
                </View>
                :
                <View style={styles.indicatorContainer}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
                }
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0
    },
    insiderView: {
        flex: 1,
        padding: 40,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10
    },
    header: {
        color: 'tomato',
        fontSize: 20,
        fontWeight: 'bold'
    },
    image: {
        width: 200, 
        height: 200, 
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10
    },
    indicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default observer(AddPhotoModal);
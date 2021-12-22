import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, ActivityIndicator, TextInput } from 'react-native';
import Modal from "react-native-modal";
import { Ionicons } from '@expo/vector-icons';
import { ColorPicker } from 'react-native-color-picker';
import firestore from '../helpers/firebase/firestore';
import albumsStore from "../helpers/store/albumsStore";

const addAlbumModal = ({hideModal, addAlbumModalVisibility, editState}) => {
    const [activityIndicator, setActivityIndicator] = useState(false);
    const [album, setAlbum] = useState({
        name: '',
        color: '#ffea23'
    });

    useEffect(() => {
        if(editState) {
            setAlbum({
               name:  albumsStore.bringAlbumFromID(albumsStore.editAlbumID)[0].name,
               color: albumsStore.bringAlbumFromID(albumsStore.editAlbumID)[0].color
            });
        }
    }, []);

    const createAlbumEvent = async () => {
        setActivityIndicator(true);
        let result = await firestore.createAlbum(album);
        if(result === true) {
            hideModal();
        }
        setActivityIndicator(false);
    }

    const editAlbumEvent = async () => {
        setActivityIndicator(true);
        let result = await firestore.editAlbum(album);
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
                isVisible={addAlbumModalVisibility}
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
                    <Text style={styles.header}>{editState ? 'Edit Album' : 'Create Album'}</Text>

                    <View style={{marginTop: 20, flex: 1}}>
                        <Text>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Type album name"
                            onChangeText={text => setAlbum({...album, name: text})}
                            defaultValue={album.name}
                        />
                        
                        <ColorPicker
                            defaultColor={album.color}
                            onColorSelected={color => setAlbum({...album, color: color})}
                            style={{flex: 3/4, marginTop: 10}}
                            //color={album.color}
                        />
                    </View>

                    <View style={{position: 'absolute', bottom: 20, right: 20}}>
                        {editState ?
                            <Button title="Edit" onPress={editAlbumEvent} color="tomato"/> :
                            <Button title="Create" onPress={createAlbumEvent} color="tomato"/>
                        }
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
    indicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    }
});

export default addAlbumModal
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import Modal from "react-native-modal";
import { Ionicons } from '@expo/vector-icons';

import { observer } from "mobx-react-lite";
import imageStore from "../helpers/store/imageStore";
import imagePicker from './../helpers/imagePicker';

const AddPhotoModal = ({hideModal, addPhotoModalVisibility}) => {
    useEffect(() => {
        imageStore.setImage('test');
    }, []);
    console.log(imageStore.image);

    return (
        <View>
            <Modal
                isVisible={addPhotoModalVisibility}
                onBackButtonPress={hideModal}
                onBackdropPress={hideModal}
                animationIn={"zoomIn"}
                animationOut={"zoomOut"}
                animationInTiming={500}
                animationOutTiming={500}>
                <View style={styles.insiderView}>
                    <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
                        <Ionicons name="close-circle-sharp" size={30} color="brown" />
                    </TouchableOpacity>
                    <Text style={styles.header}>Upload Photo</Text>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Button title="Pick an image from camera roll" onPress={imagePicker.pickImage} />
                        {imageStore.image && <Image source={{ uri: imageStore.image }} style={{ width: 200, height: 200 }} />}
                    </View>
                </View>
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
    }
});

export default observer(AddPhotoModal);
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import { Ionicons } from '@expo/vector-icons';

const addPhotoModal = ({hideModal, addPhotoModalVisibility}) => {
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

export default addPhotoModal;
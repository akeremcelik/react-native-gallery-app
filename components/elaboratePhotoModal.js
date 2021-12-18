import React from 'react';
import {View, Image, TouchableOpacity, Text, Button, ActivityIndicator, StyleSheet} from 'react-native';
import Modal from "react-native-modal";
import {Ionicons} from "@expo/vector-icons";
import storage from "./../helpers/firebase/storage";

const elaboratePhotoModal = ({hideModal, eloboratePhotoModalVisibility, selectedItem}) => {
    const deletePhoto = async (selectedItem) => {
        let result = await storage.deleteImage(selectedItem);
        if(result === true) {
            hideModal();
        } else {
            alert('Something went wrong');
        }
    }

    return (
        <View>
            <Modal
                isVisible={eloboratePhotoModalVisibility}
                onBackButtonPress={hideModal}
                onBackdropPress={hideModal}
                animationIn={"zoomIn"}
                animationOut={"zoomOut"}
                animationInTiming={500}
                animationOutTiming={500}>

                <View style={styles.insiderView}>
                    <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
                        <Ionicons name="close-circle-sharp" size={30} color="white"/>
                    </TouchableOpacity>

                    <Image source={{uri: selectedItem}} style={styles.image}/>
                    <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                        <TouchableOpacity style={[styles.button, {backgroundColor: 'blue'}]}>
                            <Ionicons name="create" size={30} color="white"/>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]} onPress={() => deletePhoto(selectedItem)}>
                            <Ionicons name="trash" size={30} color="white"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        right: -10,
        top: -10,
        zIndex: 1
    },
    insiderView: {
        borderRadius: 10
    },
    header: {
        color: 'tomato',
        fontSize: 20,
        fontWeight: 'bold'
    },
    image: {
        width: '100%',
        height: 300,
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    indicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        flex: 1/2,
        alignItems: 'center',
        padding: 10,
        marginTop: 2,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        marginHorizontal: 1
    }
});

export default elaboratePhotoModal;
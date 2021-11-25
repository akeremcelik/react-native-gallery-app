import React from 'react';
import { Modal, View, TouchableHighlight, Text, Alert } from 'react-native';

const addPhotoModal = ({hideModal}) => {
    return (
        <View style={{marginTop: 22}}>
            <Modal
                animationType="slide"
                transparent={false}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{marginTop: 22}}>
                    <View>
                        <Text>Hello World!</Text>

                        <TouchableHighlight
                            onPress={hideModal}>
                            <Text>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default addPhotoModal;
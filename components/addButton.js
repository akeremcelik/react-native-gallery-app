import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const addButton = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <Ionicons name="add" size={40} color="white" />
        </TouchableOpacity>
    );
}

const styles= StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'tomato',

        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 15,
        right: 20,

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default addButton;
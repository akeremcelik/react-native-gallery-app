import React from 'react';
import { TouchableOpacity, StyleSheet, View } from "react-native";

const photoBlock = () => {
    return(
        <TouchableOpacity style={styles.container}></TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 125,
        height: 125,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginBottom: 5,
    }
});

export default photoBlock;
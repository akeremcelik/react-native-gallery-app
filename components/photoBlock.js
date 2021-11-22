import React from 'react';
import { TouchableOpacity, StyleSheet, View } from "react-native";

const photoBlock = () => {
    return(
        <TouchableOpacity style={styles.container}></TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '33%',
        height: '20%',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 5,
    }
});

export default photoBlock;
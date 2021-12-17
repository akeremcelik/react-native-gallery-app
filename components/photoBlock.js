import React from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from "react-native";

const photoBlock = ({item}) => {
    return(
        <TouchableOpacity style={styles.container}>
            <Image style={styles.image} source={{uri:item}} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1 / 3,
        height: 125,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginBottom: 5,
        marginHorizontal: 2
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    }
});

export default photoBlock;
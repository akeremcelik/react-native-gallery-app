import React from 'react';
import { TouchableOpacity, StyleSheet, View, Image, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const albumBlock = ({item}) => {
    let color = item.color + '60';
    return(
        <TouchableOpacity style={[styles.container, {backgroundColor: color}]}>
            <View style={styles.iconView}>
                <Ionicons name="open-outline" size={40} color="black" />
            </View>
            
            <Text style={styles.albumName}>{item.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1 / 2,
        height: 125,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginBottom: 5,
        marginHorizontal: 2,
    },
    albumName: {
        fontSize: 15,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    iconView: {
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: 1
    }
});

export default albumBlock;
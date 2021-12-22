import React from 'react';
import { TouchableOpacity, StyleSheet, View, Image, Text, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';

const albumBlock = ({item, deleteAlbum, onPress}) => {
    const deleteAlert = (id, name) => {
        Alert.alert(
            "Delete Album",
            "Album is going to be deleted with photos inside of it",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteAlbum(id, name) }
            ]
        );
    }

    let color = item.color + '60';
    return(
        <TouchableOpacity style={[styles.container, {backgroundColor: color}]} onPress={onPress}>
            <View style={styles.iconView}>
                <Ionicons name="open-outline" size={40} color="black" />
            </View>
            <Text style={styles.albumName}>{item.name}</Text>

            <Menu>
                <MenuTrigger style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5}}>
                    <Ionicons name="ellipsis-vertical-outline" size={20} color="black" />
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption onSelect={() => item.id != 0 && deleteAlert(item.id, item.name)} >
                        <Text style={{color: 'red'}}>Delete</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
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
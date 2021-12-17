import React, { useState, useEffect } from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import _ from 'lodash';

import PhotoBlock from '../components/photoBlock';
import AddButton from '../components/addButton';
import AddPhotoModal from "../components/addPhotoModal";

import { observer } from "mobx-react-lite";
import imagesStore from "../helpers/store/imagesStore";

const photosScreen = () => {
    const [photos, setPhotos] = useState([]);
    const [addPhotoModalVisibility, setAddPhotoModalVisibility] = useState(false);

    useEffect(() => {
        setPhotos([...imagesStore.images])
    }, [imagesStore.images]);

    return (
        <View style={styles.photos}>
            <FlatList
                numColumns={3}
                data={photos}
                renderItem={({item}) => <PhotoBlock item={item} />}
                keyExtractor={(item, index) => `addition-${index.toString()}`}
            />
            <AddButton showModal={() => setAddPhotoModalVisibility(true)} />
            {addPhotoModalVisibility &&
            <AddPhotoModal hideModal={() => setAddPhotoModalVisibility(false)} addPhotoModalVisibility={addPhotoModalVisibility} />}
        </View>
    );
}

const styles = StyleSheet.create({
    photos: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 10
    }
});

export default observer(photosScreen);
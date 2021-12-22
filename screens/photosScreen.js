import React, { useState, useEffect } from 'react';
import {View, StyleSheet, ScrollView, FlatList, Text} from 'react-native';
import _ from 'lodash';

import PhotoBlock from '../components/photoBlock';
import AddButton from '../components/addButton';
import AddPhotoModal from "../components/addPhotoModal";
import EloboratePhotoModal from "../components/elaboratePhotoModal";

import { observer } from "mobx-react-lite";
import imagesStore from "../helpers/store/imagesStore";
import storage from "../helpers/firebase/storage";

const photosScreen = ({route}) => {
    const [photos, setPhotos] = useState([]);
    const [addPhotoModalVisibility, setAddPhotoModalVisibility] = useState(false);
    const [eloboratePhotoModalVisibility, setEloboratePhotoModalVisibility] = useState(false);
    const [selectedItem, setSelectedItem] = useState();

    const album_id = (route.params && route.params.album_id) ?? -1

    useEffect( async () => {
        if(album_id >= 0) {
            setPhotos(await storage.retrieveImagesByAlbumID(album_id));
        } else {
            setPhotos([...imagesStore.images])
        }
    }, [imagesStore.images]);

    const displayEloborateModal = (item) => {
        setSelectedItem(item);
        setEloboratePhotoModalVisibility(true);
    }

    return (
        <View style={styles.photos}>
            <View style={{flex: 1}}>
                {photos.length <= 0 && <Text>There is no uploaded photos</Text>}
                <FlatList
                    numColumns={3}
                    data={photos}
                    renderItem={({item}) => <PhotoBlock item={item} showModal={() => displayEloborateModal(item)} />}
                    keyExtractor={(item, index) => `addition-${index.toString()}`}
                />
            </View>
            <AddButton showModal={() => setAddPhotoModalVisibility(true)} />
            {addPhotoModalVisibility &&
            <AddPhotoModal hideModal={() => setAddPhotoModalVisibility(false)} addPhotoModalVisibility={addPhotoModalVisibility} />}
            {eloboratePhotoModalVisibility &&
            <EloboratePhotoModal hideModal={() => setEloboratePhotoModalVisibility(false)} eloboratePhotoModalVisibility={eloboratePhotoModalVisibility} selectedItem={selectedItem} />}
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
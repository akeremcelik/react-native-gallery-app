import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import _ from 'lodash';

import PhotoBlock from '../components/photoBlock';
import AddButton from '../components/addButton';
import AddPhotoModal from "../components/addPhotoModal";

const photosScreen = () => {
    const [photos, setPhotos] = useState([]);
    const [addPhotoModalVisibility, setAddPhotoModalVisibility] = useState(false);

    useEffect(() => {
        setPhotos(_.times(15));
    }, []);

    return (
        <View>
            <ScrollView>
                <View style={styles.photos}>
                    {photos.map((key) => <PhotoBlock key={key} />)}
                </View>
            </ScrollView>
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

export default photosScreen;
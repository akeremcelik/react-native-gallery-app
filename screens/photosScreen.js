import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import _ from 'lodash';

import PhotoBlock from '../components/photoBlock';

const photosScreen = () => {
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        setPhotos(_.times(15));
    }, []);

    return (
        <ScrollView>
            <View style={styles.photos}>
                {photos.map((key) => <PhotoBlock key={key} />)}
            </View>
        </ScrollView>
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
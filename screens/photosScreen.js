import React from 'react';
import { View, StyleSheet } from 'react-native';
import _ from 'lodash';

import PhotoBlock from '../components/photoBlock';

const photosScreen = () => {
    return (
        <View style={styles.photos}>
            {_.times(5).map((key) => <PhotoBlock key={key} />)}
        </View>
    );
}

const styles = StyleSheet.create({
    photos: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
    }
});

export default photosScreen;
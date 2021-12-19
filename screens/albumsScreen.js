import React, { useState } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

import { observer } from "mobx-react-lite";
import albumsStore from '../helpers/store/albumsStore';
import AlbumBlock from '../components/albumBlock';
import AddButton from '../components/addButton';
import AddAlbumModal from '../components/addAlbumModal';

const albumsScreen = () => {
    const [addAlbumModalVisibility, setAddAlbumModalVisibility] = useState(false);

    return (
        <View style={styles.container}>
            <View style={{flex: 1}}>
                {albumsStore.albums.length <= 0 && <Text>There is no created albums</Text>}
                <FlatList
                    numColumns={2}
                    data={albumsStore.albums.slice()}
                    renderItem={({item}) => <AlbumBlock item={item} />}
                    keyExtractor={(item, index) => `addition-${index.toString()}`}
                />
            </View>
            <AddButton showModal={() => setAddAlbumModalVisibility(true)} />
            {addAlbumModalVisibility &&
                <AddAlbumModal hideModal={() => setAddAlbumModalVisibility(false)} addAlbumModalVisibility={addAlbumModalVisibility} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 10
    }
})

export default observer(albumsScreen);
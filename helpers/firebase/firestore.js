import * as firebase from 'firebase';
import albumsStore from '../store/albumsStore';

const uploadImage = (imageName, albumID) => {
    firebase.firestore()
            .collection('images')
            .doc(imageName)
            .set({
                album_id: parseInt(albumID),
                datetime: new Date()
            })
}

const deleteImage = (imageName) => {
    firebase.firestore()
            .collection('images')
            .doc(imageName)
            .delete();
}

const retrieveImages = () => {
    return firebase.firestore().collection('images').orderBy('datetime', 'desc').get()
}

const retrieveAlbums = async () => {
    let albumsArr = [];
    let albums = await firebase.firestore().collection('albums').get();
    let albumsProceed = await Promise.all(albums.docs.map((album) => {
        albumsArr.push({id: album.data().id, color: album.data().color, name: album.id})
        album.data().id > albumsStore.maxAlbumID && albumsStore.setMaxAlbumID(album.data().id)
    }));
    albumsStore.setAlbums([{id: 0, color: "#fff", name: "No Album"}, ...albumsArr]);
}

const createAlbum = async (album) => {
    if(album.name !== '') {
        try {
            await firebase.firestore().collection('albums').doc(album.name).set({
                color: album.color,
                id: albumsStore.maxAlbumID+1
            });
            albumsStore.addAlbum(album);
            return true;
        } catch (error) {
            alert('Something went wrong')
            return false;
        }
    } else {
        alert('Album name is required');
        return false;
    }
}

export default {uploadImage, deleteImage, retrieveImages, retrieveAlbums, createAlbum}
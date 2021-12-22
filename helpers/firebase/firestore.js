import * as firebase from 'firebase';
import albumsStore from '../store/albumsStore';
import storage from "./storage";

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
        if(album.id !== 'config') {
            albumsArr.push({id: album.data().id, color: album.data().color, name: album.id})
        } else {
            albumsStore.setMaxAlbumID(album.data().value)
        }
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
            albumsStore.addAlbum({...album, id: albumsStore.maxAlbumID+1});
            updateConfigValue(albumsStore.maxAlbumID+1);
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

const editAlbum = async (album) => {
    if(album.name !== '') {
        try {
            let oldAlbum = albumsStore.albums.filter((alb) => alb.id === albumsStore.editAlbumID);
            await firebase.firestore().collection('albums').doc(oldAlbum[0].name).delete();
            await firebase.firestore().collection('albums').doc(album.name).set({
                color: album.color,
                id: oldAlbum[0].id
            });

            let albums = albumsStore.albums;
            let ind = albumsStore.albums.findIndex((alb) => alb == oldAlbum[0]);
            let newAlbum = {
                color: album.color,
                id: oldAlbum[0].id,
                name: album.name
            }

            albums[ind] = newAlbum;
            albumsStore.setAlbums(albums);

            return true;
        } catch (error) {
            console.log(error)
            alert('Something went wrong')
            return false;
        }
    } else {
        alert('Album name is required');
        return false;
    }
}

const deleteAlbum = (name) => {
    firebase.firestore()
            .collection('albums')
            .doc(name)
            .delete();
}

const updateConfigValue = (value) => {
    firebase.firestore().collection('albums').doc('config').set({
        value: value
    });
    albumsStore.setMaxAlbumID(value);
}

const updateImageAlbum = (item, albumName) => {
    let imageName = storage.bringImageNameFromUrl(item);
    let album_id = albumsStore.bringAlbumFromName(albumName)[0].id;
    firebase.firestore().collection('images').doc(imageName).update({
        album_id: album_id
    });
}

const fetchImageAlbum = async (image) => {
    let album_id = 0;
    let imageName = storage.bringImageNameFromUrl(image);
    let images = await firebase.firestore().collection('images').get();
    await Promise.all(images.docs.map((img) => {
        if(img.id === imageName) {
            album_id = img.data().album_id;
        }
    }));

    return album_id;
}

export default {uploadImage, deleteImage, retrieveImages, retrieveAlbums, createAlbum, editAlbum, deleteAlbum, updateConfigValue, updateImageAlbum, fetchImageAlbum}
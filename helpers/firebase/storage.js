import * as firebase from 'firebase';

import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import imageStore from "./../store/imageStore";
import imagesStore from "./../store/imagesStore";

import firestore from './firestore';

const uploadImage = async() => {
    if(imageStore.getImage() !== null) {
        try {
            const response = await fetch(imageStore.getImage());
            const blob = await response.blob();
            let imageName = uuid();
            let ref = firebase.storage().ref().child("/images/" + imageName);
            await ref.put(blob);
            await firestore.uploadImage(imageName, imageStore.album_id);

            let pic = await ref.getDownloadURL();
            imagesStore.addImage(pic);
        } catch (e) {
            alert('Something went wrong')
            return false;
        }

        return true;
    } else {
        alert('Image selection is required');
        return false;
    }
}

const retrieveImages = async () => {
    /*
    let list = await firebase.storage().ref().child('images').list()
    let pictures = await Promise.all(list.items.map((pics) => firebase.storage().ref().child(pics.fullPath).getDownloadURL()))
    imagesStore.setImages(pictures);
    */
    
    let images = await firestore.retrieveImages();
    let pictures = await Promise.all(images.docs.map((pics) => firebase.storage().ref().child('images/' + pics.id).getDownloadURL()));
    imagesStore.setImages(pictures);
}

const retrieveImagesByAlbumID = async (id) => {
    let images = await firestore.retrieveImages();
    let pictures = await Promise.all(images.docs.map(async (pics) => {
        return {
            src: await firebase.storage().ref().child('images/' + pics.id).getDownloadURL(),
            album_id: pics.data().album_id
        }
    }));

    return pictures.filter((pic) => pic.album_id == id).map((pic) => pic.src);
}

const deleteImage = async (url) => {
    try {
        let imageRef = await firebase.storage().refFromURL(url);
        await imageRef.delete();

        let imageName = bringImageNameFromUrl(url);
        await firestore.deleteImage(imageName);
        
        imagesStore.deleteImage(url);
        return true;
    } catch (e) {
        return false;
    }
}

const deleteImageByAlbumID = async (id) => {
    try {
        let images = await firebase.firestore().collection('images').get();
        await Promise.all(images.docs.map((pics) => {
            if(pics.data().album_id === id) {
                firebase.storage().ref().child('images/' + pics.id).delete()
                imagesStore.deleteImageIfIncludes(pics.id)
                firestore.deleteImage(pics.id)
            }
        }));
    } catch (e) {
        console.log(e);
    }
}

const bringImageNameFromUrl = (url) => {
    let u1 = url.indexOf('%2F');
    let u2 = url.indexOf('?');
    let imageName = url.substring(u1+3, u2);
    return imageName;
}

export default {uploadImage, retrieveImages, deleteImage, deleteImageByAlbumID, bringImageNameFromUrl, retrieveImagesByAlbumID}
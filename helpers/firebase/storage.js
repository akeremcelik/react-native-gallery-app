import * as firebase from 'firebase';

import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import imageStore from "./../store/imageStore";
import imagesStore from "./../store/imagesStore";
import { times } from 'lodash';

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

const deleteImage = async (url) => {
    try {
        let imageRef = await firebase.storage().refFromURL(url);
        await imageRef.delete();
        
        let u1 = url.indexOf('%2F');
        let u2 = url.indexOf('?');
        let imageName = url.substring(u1+3, u2);
        await firestore.deleteImage(imageName);
        
        imagesStore.deleteImage(url);
        return true;
    } catch (e) {
        return false;
    }
}

export default {uploadImage, retrieveImages, deleteImage}
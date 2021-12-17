import * as firebase from 'firebase';

import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import imageStore from "./../store/imageStore";
import imagesStore from "./../store/imagesStore";

const uploadImage = async() => {
    if(imageStore.getImage() !== null) {
        try {
            const response = await fetch(imageStore.getImage());
            const blob = await response.blob();
            let ref = firebase.storage().ref().child("/images/" + uuid());
            await ref.put(blob);

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
    let list = await firebase.storage().ref().child('images').list()
    let pictures = await Promise.all(list.items.map((pics) => firebase.storage().ref().child(pics.fullPath).getDownloadURL()))
    imagesStore.setImages(pictures);
}

export default {uploadImage, retrieveImages}
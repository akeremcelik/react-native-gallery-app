import * as firebase from 'firebase';

import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import imageStore from "./../store/imageStore";

const uploadImage = async() => {
    if(imageStore.getImage() !== null) {
        const response = await fetch(imageStore.getImage());
        const blob = await response.blob();
        var ref = firebase.storage().ref().child("/images/" + uuid());
        return ref.put(blob);
    } else {
        alert('Image selection is required')
    }
}

export default {uploadImage}
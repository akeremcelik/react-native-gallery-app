import * as firebase from 'firebase';

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

export default {uploadImage, deleteImage, retrieveImages}
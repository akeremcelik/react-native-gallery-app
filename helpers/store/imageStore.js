import mobx, {makeAutoObservable, observable} from "mobx";
import * as ImagePicker from 'expo-image-picker';
import {Platform} from "react-native";

class ImageStore {
    constructor() {
        makeAutoObservable(this);
    }

    image = null;
    album_id = 0;

    setImage(incImg) {
        this.image = incImg;
    }

    getImage() {
        return this.image;
    }

    setAlbumID(albumID) {
        this.album_id = albumID;
    }

    async askForPerm() {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }

            return status;
        }

    }
}
const imageStore = new ImageStore()
export default imageStore;
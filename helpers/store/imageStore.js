import mobx, {makeAutoObservable, observable} from "mobx";
import * as ImagePicker from 'expo-image-picker';
import {Platform} from "react-native";

class ImageStore {
    constructor() {
        makeAutoObservable(this);
    }

    image = null;

    setImage(incImg) {
        this.image = incImg;
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
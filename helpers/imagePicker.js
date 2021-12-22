import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { observer } from "mobx-react-lite";
import imageStore from "../helpers/store/imageStore";

const pickImage = async () => {
    if(await imageStore.askForPerm() === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            imageStore.setImage(result.uri);
        }
    }
};

export default { pickImage }
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigators/tabNavigator';

import * as firebase from "firebase";
import storage from './helpers/firebase/storage';
import firestore from './helpers/firebase/firestore';

import { MenuProvider } from 'react-native-popup-menu';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

export default function App() {
    const firebaseConfig = {
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: ""
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
    //initializeApp(firebaseConfig);
    storage.retrieveImages();
    firestore.retrieveAlbums();

    return (
      <ActionSheetProvider>
          <MenuProvider>
              <NavigationContainer>
                <TabNavigator />
              </NavigationContainer>
          </MenuProvider>
      </ActionSheetProvider>
    )
}
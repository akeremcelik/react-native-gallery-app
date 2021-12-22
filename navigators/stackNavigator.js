import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhotosScreen from "../screens/photosScreen";
import AlbumsScreen from "../screens/albumsScreen";
import * as React from "react";

const Stack = createNativeStackNavigator();

const photosStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Photos" component={PhotosScreen} />
        </Stack.Navigator>
    )
}

const albumsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Albums" component={AlbumsScreen} />
            <Stack.Screen name="Album Photos" component={PhotosScreen} />
        </Stack.Navigator>
    )
}

export default { photosStack, albumsStack }
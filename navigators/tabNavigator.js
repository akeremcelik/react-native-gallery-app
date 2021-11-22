import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import PhotosScreen from '../screens/photosScreen';
import AlbumsScreen from '../screens/albumsScreen';

const Tab = createBottomTabNavigator();

export default function tabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Photos') {
                        iconName = focused
                            ? 'image'
                            : 'image-outline';
                    } else if (route.name === 'Albums') {
                        iconName = focused ? 'albums' : 'albums-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Photos" component={PhotosScreen} />
            <Tab.Screen name="Albums" component={AlbumsScreen} />
        </Tab.Navigator>
    )
}
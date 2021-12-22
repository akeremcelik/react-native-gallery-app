import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import stackNavigator from "./stackNavigator";

const Tab = createBottomTabNavigator();

export default function tabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Photos Tab') {
                        iconName = focused
                            ? 'image'
                            : 'image-outline';
                    } else if (route.name === 'Albums Tab') {
                        iconName = focused ? 'albums' : 'albums-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Photos Tab" component={stackNavigator.photosStack} options={{ headerShown: false, title: 'Photos' }} />
            <Tab.Screen name="Albums Tab" component={stackNavigator.albumsStack} options={{ headerShown: false, title: 'Albums' }} />
        </Tab.Navigator>
    )
}
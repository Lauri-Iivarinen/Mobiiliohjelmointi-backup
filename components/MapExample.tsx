import React from 'react';
import { useState } from 'react';
import { Button, TextInput, View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect } from 'react';

interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export default function MapExample() {

    const [region, setRegion] = useState<Region>({
        latitude: 60.2,
        longitude: 24.93,
        latitudeDelta: 0.03,
        longitudeDelta: 0.022,
    });
    const [location, setLocation] = useState<any>(null)

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status != 'granted') {
                Alert.alert('no permission')
                return
            }
            let location = await Location.getCurrentPositionAsync({})
            setLocation(location)
        })
    }, [])
    
    return (
        <View style={{flex:1}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <MapView
                    style={{flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
                    initialRegion={region}
                >
                <Marker title="testi" coordinate={{latitude: 60.2, longitude: 24.93}}></Marker>
                </MapView>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 10}}>
                <TextInput style={{width: 200, borderWidth: 1}}></TextInput>
                <Button title="Press"></Button>
            </View>
        </View>
    )
}
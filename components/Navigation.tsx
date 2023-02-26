import React, { useState } from 'react'
import { View, Alert, Text, TextInput, Button, Keyboard } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { useEffect } from 'react';
import {MAPQUEST_API_KEY} from '@env'

interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

interface latLng {
    lat: number;
    lng: number;
}

export default function Navigation() {
    const [location, setLocation] = useState<any>()
    const [address, setAddress] = useState<string>('')
    const [marker, setMarker] = useState<latLng[]>([])
    const [fetchMsg, setFetchMsg] = useState('')

    const getLocation = async () => {
        //console.log('hi')
        let { status } = await Location.requestForegroundPermissionsAsync()
        //console.log(await status)
        if (await status != 'granted') {
            Alert.alert('No permission')
            return
        }
        let loc = await Location.getCurrentPositionAsync()
        setLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.022,
        })
        //console.log(await loc)
    }

    const findCoords = () => {
        Keyboard.dismiss()
        fetch('http://www.mapquestapi.com/geocoding/v1/address?key='+MAPQUEST_API_KEY+'&location=' + address + ',Suomi')
            .then(response => response.json())
            .then(result => {
                const arr: any = []
                result.results[0].locations.forEach((result: { latLng: any; })  => {
                    arr.push(result.latLng)
                })
                setMarker(arr)
                const end = arr.length === 1 ? '' : 's'
                setFetchMsg('Found ' + arr.length + ' result' + end + '!')
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getLocation()
    }, [])



    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Find address</Text>
                <TextInput style={{width: 200, borderWidth: 1}} onChangeText={(e) => setAddress(e)}></TextInput>
                <Button title="Find" onPress={findCoords}></Button>
                <Text>{fetchMsg}</Text>
            </View>
            <MapView
                style={{ flex: 4, height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}
                region={location}
            >
                {marker.map((marker: latLng, index: React.Key | null | undefined) => {
                return(<Marker key={index} title="test" coordinate={{latitude: marker.lat, longitude: marker.lng}}></Marker>)
                })}
            </MapView>
        </View>
    )
    
}
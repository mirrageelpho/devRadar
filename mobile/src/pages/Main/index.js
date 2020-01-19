import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../../services/http'


//Component
function Main({ navigation }) {
    const [devs, setDevs] = useState([])
    const [techs, setTechs] = useState('')
    const [currentRegion, setCurrentRegion] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        async function loadInitialPosition() {
            setIsLoading(true)
            const { granted } = await requestPermissionsAsync()
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                })

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
            setIsLoading(false)
        }
        loadInitialPosition()
    }, [])
    if (!currentRegion) {
        return null;
    }

    async function handleSearchDevs() {
        setIsLoading(true)
        const { latitude, longitude } = currentRegion
        const response = await api.get('/search', {

            params:{
                latitude,
                longitude,
                techs: techs.toLowerCase()
            }
        })
        setIsLoading(false)
        console.log('response ==>', response.data)
        setDevs(response.data)
    }

    function handleRegionChange(region) {
        console.log(region)
        setCurrentRegion(region)
    }


    return (
        <>                  
            <MapView
                onRegionChangeComplete={handleRegionChange}
                initialRegion={currentRegion}
                style={styles.mapStyle}>
                {devs.map(dev => (
                    <Marker 
                    key={dev._id}
                    coordinate={{
                        longitude: dev.location.coordinates[0],
                        latitude: dev.location.coordinates[1]
                    }} >
                        <View style={styles.avatar_shadow}>
                            <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />
                        </View>
                        <Callout onPress={() => {
                            navigation.navigate('Profile', { github_username: dev.github_username })
                        }}>
                            <View style={styles.calout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devTechs}>{dev.techs.map(tech=>tech[0].toUpperCase() + tech.slice(1)).join(', ')}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder='Buscar devs por tecn...'
                    placeholderTextColor="#999"
                    value={techs}
                    onChangeText={setTechs}
                />
                <TouchableOpacity style={styles.iconSearch} onPress={() => { handleSearchDevs() }}>
                    {isLoading ? 
                    <ActivityIndicator size="small" color="#fff" /> 
                    :
                    <MaterialIcons name="my-location" size={20} color="#fff" />
                    }
                </TouchableOpacity>
            </View>
        </>
    )
}


//styles
const styles = StyleSheet.create({
    mapStyle: {
        flex: 1
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 4,
        borderColor: '#fff',
    },
    avatar_shadow: {
        alignItems: "center",
        justifyContent: 'center',
        width: 54,
        height: 54,
        borderRadius: 4,
        backgroundColor: "#fff",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
    },
    calout: {
        width: 260
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color: '#777',
        marginTop: 5
    },
    devTechs: {
        marginTop: 5
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: "row",
    },
    searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    iconSearch: {
        borderRadius: 50,
        padding: 10,
        marginHorizontal: 10,
        backgroundColor: '#7D40e7',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    }
});

export default Main
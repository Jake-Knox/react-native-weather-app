import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

import config from '../config';

const WeatherScreen = () => {
    const apiKey = config.apiKey;

    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const getWeatherData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
            );
            // console.log(response);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Enter Location:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setLocation(text)}
                value={location}
                placeholder='Enter Location'
            />
            <Button title='Get Weather' onPress={getWeatherData} />
            {weatherData && (
                <View style={styles.weatherContainer}>
                    <Text style={styles.weatherInfo}>Weather Information for {weatherData.name}:</Text>
                    <Text style={styles.weatherInfo}>Temperature {weatherData.main.temp}°C</Text>
                    <Text style={styles.weatherInfo}>Description {weatherData.weather[0].description}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // semi transparent background color
        padding: 16,
        width: '100%',

    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
        width: '100%',
    },
    weatherContainer: {
        marginTop: 20,
    },
    weatherInfo: {
        fontSize: 16,
        marginBottom: 8,
    },
});

export default WeatherScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

import config from '../config';
import WeatherImage from './WeatherImage';

const WeatherScreen = () => {
    const weatherApiKey = config.weatherApiKey;

    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [searchStatus, setSearchStatus] = useState(false);

    // Update the search status when a new search happens
    const handleNewSearch = () => {
        setSearchStatus(true);
    };

    const getWeatherData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${weatherApiKey}`
            );
            // console.log(response);
            setWeatherData(response.data);
            handleNewSearch(); // in WeatherImage.js to initiate image api call

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Weather App</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setLocation(text)}
                value={location}
                placeholder="Enter Location"
            />
            <Button title="Get Weather" onPress={getWeatherData} />
            {weatherData && (
                <View style={styles.weatherContainer}>
                    <Text style={styles.weatherInfo}>
                        Weather Information for {weatherData.name}:
                    </Text>
                    <Text style={styles.weatherInfo}>
                        Temperature: {weatherData.main.temp} °C
                    </Text>
                    <Text style={styles.weatherInfo}>
                        Current weather: {weatherData.weather[0].description}
                    </Text>
                    <WeatherImage
                        location={location}
                        weatherCondition={weatherData.weather[0].description}
                        searchStatus={searchStatus}
                        setSearchStatus={setSearchStatus}
                    />
                </View>
            )}
        </View>
    );
};

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

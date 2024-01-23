import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import axios from 'axios';

import config from '../config';

const WeatherImage = ({ location, weatherCondition, searchStatus, setSearchStatus }) => {
    const imageApiKey = config.imageApiKey;

    const [imageUrl, setImageUrl] = useState(null);

    // `https://api.unsplash.com/photos/random?query=${location}+${weatherCondition}&client_id=${imageApiKey}`

    useEffect(() => {
        const fetchImage = async () => {
            try {
                if (searchStatus) {
                    console.log(`search for ${location}+${weatherCondition}`)
                    const response = await axios.get(
                        `https://api.unsplash.com/photos/random?query=${location}&client_id=${imageApiKey}`
                    );
                    setImageUrl(response.data.urls.regular);
                    setSearchStatus(false);
                }
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };
        fetchImage();
    }, [location, weatherCondition, searchStatus, setSearchStatus]);

    return (
        <View style={styles.imageContainer}>
            {imageUrl &&
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    alt={`Image showing ${location}, ${weatherCondition}`}
                />}
        </View>
    )
};

const styles = StyleSheet.create({
    imageContainer: {
        marginTop: 20,
        width: '100%',
        aspectRatio: 16 / 9, // adjust aspect ratio?
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        flex: 1,
    },
});

export default WeatherImage;
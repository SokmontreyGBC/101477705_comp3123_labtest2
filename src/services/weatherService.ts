import axios from 'axios';
import { WeatherData } from '@/components/WeatherCard';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
    try {
        const response = await axios.get<WeatherData>(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

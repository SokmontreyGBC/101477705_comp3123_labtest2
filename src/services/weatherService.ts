import axios from 'axios';
import type { WeatherData } from '@/components/WeatherCard';

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

export interface ForecastData {
    list: Array<{
        dt: number;
        main: {
            temp: number;
        };
        weather: Array<{
            description: string;
            icon: string;
        }>;
        dt_txt: string;
    }>;
}

const FORECAST_URL = 'http://api.openweathermap.org/data/2.5/forecast';

export const fetchWeatherForecast = async (city: string): Promise<ForecastData> => {
    try {
        const response = await axios.get<ForecastData>(FORECAST_URL, {
            params: {
                q: city,
                appid: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching weather forecast:", error);
        throw error;
    }
};

export const fetchCityImage = async (city: string): Promise<string | null> => {
    console.log(`fetchCityImage called for city: ${city}`);
    const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    console.log(`Unsplash API Key present: ${!!apiKey}`);

    try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: city,
                client_id: apiKey,
                per_page: 1,
            },
        });
        console.log("Unsplash response:", response.status);
        if (response.data.results && response.data.results.length > 0) {
            return response.data.results[0].urls.regular;
        }
        return null;
    } catch (error) {
        console.error("Error fetching city image:", error);
        return null;
    }
};

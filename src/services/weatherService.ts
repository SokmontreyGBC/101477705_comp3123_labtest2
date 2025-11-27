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

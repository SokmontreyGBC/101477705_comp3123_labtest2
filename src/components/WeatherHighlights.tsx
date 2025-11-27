import type { WeatherData } from '../types';

interface WeatherHighlightsProps {
    weatherData: WeatherData | null;
}

export default function WeatherHighlights({ weatherData }: WeatherHighlightsProps) {
    if (!weatherData) return null;

    const { main, wind } = weatherData;
    const feelsLikeCelsius = Math.round(main.feels_like - 273.15);

    return (
        <div className="w-full rounded-xl border bg-card text-card-foreground shadow p-6">
            <h3 className="font-semibold text-lg mb-4">Today's Highlights</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Humidity</p>
                    <p className="text-2xl font-bold">{main.humidity}%</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Wind Speed</p>
                    <p className="text-2xl font-bold">{wind.speed} m/s</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg col-span-2">
                    <p className="text-sm text-muted-foreground">Feels Like</p>
                    <p className="text-2xl font-bold">{feelsLikeCelsius}°C</p>
                </div>
            </div>
        </div>
    );
}

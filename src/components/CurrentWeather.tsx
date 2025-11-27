import type { WeatherData } from './WeatherCard';

interface CurrentWeatherProps {
    weatherData: WeatherData | null;
}

export default function CurrentWeather({ weatherData }: CurrentWeatherProps) {
    if (!weatherData) return null;

    const { name, main, weather, sys } = weatherData;
    const temperatureCelsius = Math.round(main.temp - 273.15);
    const weatherDescription = weather[0]?.description;
    const iconCode = weather[0]?.icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@4x.png`; // Larger icon

    return (
        <div className="w-full h-full rounded-xl border bg-card text-card-foreground shadow p-8 flex flex-col justify-between min-h-[300px]">
            <div>
                <h2 className="text-2xl font-bold">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</h2>
                <p className="text-muted-foreground">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                <p className="text-sm text-muted-foreground mt-1">{name}, {sys.country}</p>
            </div>

            <div className="flex flex-col items-start mt-4">
                <div className="flex items-center">
                    {iconCode && (
                        <img
                            src={iconUrl}
                            alt={weatherDescription}
                            className="w-24 h-24 -ml-4"
                        />
                    )}
                </div>
                <p className="text-7xl font-bold tracking-tighter">{temperatureCelsius}°C</p>
                <p className="text-xl font-medium capitalize mt-2">{weatherDescription}</p>
            </div>
        </div>
    );
}

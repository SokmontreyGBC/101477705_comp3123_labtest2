export interface WeatherData {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        main: string;
        icon: string;
    }[];
}

interface WeatherCardProps {
    weatherData: WeatherData | null;
}

export default function WeatherCard({ weatherData }: WeatherCardProps) {
    if (!weatherData) {
        return null;
    }

    const { name, main, weather } = weatherData;
    const temperatureCelsius = Math.round(main.temp - 273.15);
    const weatherCondition = weather[0]?.main;
    const iconCode = weather[0]?.icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    return (
        <div className="w-full max-w-sm mt-4 rounded-xl border bg-card text-card-foreground shadow">
            <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-semibold leading-none tracking-tight text-center text-xl">{name}</h3>
            </div>
            <div className="p-6 pt-0 flex flex-col items-center space-y-4">
                <div className="flex items-center justify-center">
                    {iconCode && (
                        <img
                            src={iconUrl}
                            alt={weatherCondition}
                            className="w-20 h-20"
                        />
                    )}
                </div>
                <div className="text-center">
                    <p className="text-4xl font-bold">{temperatureCelsius}°C</p>
                    <p className="text-lg text-muted-foreground">{weatherCondition}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full text-center">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-muted-foreground">Humidity</span>
                        <span className="text-lg font-semibold">{main.humidity}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

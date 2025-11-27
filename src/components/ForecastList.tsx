import type { ForecastData } from '../services/weatherService';

interface ForecastListProps {
    forecast: ForecastData | null;
}

export default function ForecastList({ forecast }: ForecastListProps) {
    if (!forecast) return null;

    // Filter for entries around noon to represent the daily forecast
    const dailyForecasts = forecast.list.filter(item => item.dt_txt.includes("12:00:00"));

    return (
        <div className="w-full rounded-xl border bg-card text-card-foreground shadow p-6">
            <h3 className="font-semibold text-lg mb-4">5-Day Forecast</h3>
            <div className="flex flex-row justify-between gap-4 overflow-x-auto pb-2">
                {dailyForecasts.map((day) => (
                    <div key={day.dt} className="flex flex-col items-center min-w-[80px] p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <span className="text-sm font-medium mb-2">
                            {new Date(day.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' })}
                        </span>
                        <img
                            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                            alt={day.weather[0].description}
                            className="w-10 h-10 mb-2"
                        />
                        <span className="text-lg font-bold">{Math.round(day.main.temp - 273.15)}°C</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import SearchBar from "@/components/SearchBar";
import CurrentWeather from "@/components/CurrentWeather";
import WeatherHighlights from "@/components/WeatherHighlights";
import ForecastList from "@/components/ForecastList";
import { fetchWeatherData, fetchWeatherForecast } from "@/services/weatherService";
import type { WeatherData, ForecastData } from "@/types";

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    setWeather(null);
    setForecast(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherData(city),
        fetchWeatherForecast(city)
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch("Toronto");
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <div className="w-full max-w-5xl flex flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">COMP3123 Weather App</h1>
            <p className="text-muted-foreground text-sm">Sokmontrey Sythat | 101477705</p>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading && <p className="mt-4 text-muted-foreground">Loading...</p>}

        {error && <p className="mt-4 text-destructive">{error}</p>}

        {!loading && !error && weather && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
            <div className="col-span-1">
              <CurrentWeather weatherData={weather} />
            </div>
            <div className="col-span-1 flex flex-col gap-6">
              {forecast && <ForecastList forecast={forecast} />}
              <WeatherHighlights weatherData={weather} />
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import SearchBar from "@/components/SearchBar";
import WeatherCard, { type WeatherData } from "@/components/WeatherCard";
import { fetchWeatherData } from "@/services/weatherService";

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const data = await fetchWeatherData(city);
      setWeather(data);
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
        <h1 className="text-3xl font-bold mb-8 text-foreground">Weather App</h1>

        <SearchBar onSearch={handleSearch} />

        {loading && <p className="mt-4 text-muted-foreground">Loading...</p>}

        {error && <p className="mt-4 text-destructive">{error}</p>}

        {!loading && !error && weather && (
          <WeatherCard weatherData={weather} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;

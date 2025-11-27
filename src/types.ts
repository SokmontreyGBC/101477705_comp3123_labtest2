export interface WeatherData {
    name: string;
    main: {
        temp: number;
        humidity: number;
        feels_like: number;
    };
    weather: {
        main: string;
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
    sys: {
        country: string;
    };
}

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

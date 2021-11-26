interface Weather {
  humidity: number;
  max_temp: number;
  visibility: number;
  weather_state_name: string;
}

interface WeatherResponse {
  title: string;
  consolidated_weather: Weather[];
}

export {
  WeatherResponse
}

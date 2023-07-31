import { CityWeather, OpenWeatherAPI } from '../types'

export const extractLocalCityWeather = (
  cityWeather: OpenWeatherAPI
): CityWeather => ({
  name: cityWeather.name,
  id: cityWeather.id,
  country: cityWeather.sys.country,
  coords: cityWeather.coord,
  main: {
    temp: cityWeather.main.temp,
    feels: cityWeather.main.feels_like,
    main: cityWeather.weather[0].main,
    description: cityWeather.weather[0].description,
    clouds: cityWeather.clouds.all,
    icon: cityWeather.weather[0].icon,
  },
  detail: {
    humidity: cityWeather.main.humidity,
    pressure: cityWeather.main.pressure,
    wind: cityWeather.wind,
    dt: cityWeather.dt,
    visibility: cityWeather.visibility,
  },
})

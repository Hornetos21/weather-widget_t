export interface CityCoords {
  lat: number
  lon: number
}

interface MainWeather {
  id: number
  main: string
  description: string
  icon: string
}

interface DetailWeather {
  temp: number
  feels_like: number
  pressure: number
  humidity: number
}

interface WindDetail {
  speed: number
  deg: number
  gust: number
}

export interface OpenWeatherAPI {
  id: number
  name: string
  coord: CityCoords
  weather: MainWeather[]
  main: DetailWeather
  visibility: number
  wind: WindDetail
  sys: {
    country: string
  }
  clouds: {
    all: number
  }
}

interface CityMainWeather extends Omit<MainWeather, 'id'> {
  clouds: number
  feels: number
  temp: number
}

interface CityDetailWeather {
  pressure: number
  humidity: number
  wind: WindDetail
  visibility: number
}

export interface CityWeather {
  id: number
  name: string
  country: string
  coords: CityCoords
  main: CityMainWeather
  detail: CityDetailWeather
}

export interface CoordinatesByName extends CityCoords {
  name: string
  country: string
}

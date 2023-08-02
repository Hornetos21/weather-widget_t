import { CityWeather } from '../types'

export const loadLocalStorage = (key: string) =>
  JSON.parse(localStorage.getItem(key))
    ? JSON.parse(localStorage.getItem(key))
    : []

export const saveLocalStorage = (key: string, data: CityWeather) =>
  localStorage.setItem(key, JSON.stringify(data))

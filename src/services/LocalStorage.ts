import { CityWeather } from '../types'

const id = 1

const localStorageKey = `weather-widget-${id} `

export const loadLocalStorage = () =>
  JSON.parse(localStorage.getItem(localStorageKey))
    ? JSON.parse(localStorage.getItem(localStorageKey))
    : []

export const saveLocalStorage = (cites: CityWeather) =>
  localStorage.setItem(localStorageKey, JSON.stringify(cites))

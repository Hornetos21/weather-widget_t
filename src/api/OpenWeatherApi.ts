// require('dotenv').config()

// const API_KEY = process.env.API_KEY

import { CoordinatesByName, OpenWeatherAPI } from '../types'

const apiKey = 'bcc2478cdccc5312ce2ed41e284dec9c'
const urlApi = 'https://api.openweathermap.org/'

export const getWeatherByLocation = async (
  lat: number,
  lon: number
): Promise<OpenWeatherAPI> => {
  const response = await fetch(
    `${urlApi}data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  )
  return response.json()
}
export const getCoordinatesByCityName = async (
  name: string,
  limit = 5
): Promise<CoordinatesByName[]> => {
  const response = await fetch(
    `${urlApi}geo/1.0/direct?q=${name}&limit=${limit}&appid=${apiKey}`
  )
  return response.json()
}

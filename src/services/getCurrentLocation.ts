import { CityCoords } from '../types'

export function getCurrentPosition(): Promise<GeolocationCoordinates> {
  try {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => resolve(coords),
        (error) => reject(error)
      )
    })
  } catch (e) {
    throw new Error(e.message)
  }
}

export async function getCurrentCoordinates(): Promise<CityCoords> {
  try {
    const coordinates = await getCurrentPosition()
    return {
      lat: coordinates.latitude,
      lon: coordinates.longitude,
    }
  } catch (e) {
    console.error(e.message)
    throw new Error('It is not possible to determine your geolocation')
  }
}

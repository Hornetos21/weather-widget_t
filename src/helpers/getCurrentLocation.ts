function getCurrentPosition(): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve(coords),
      (error) => reject(error)
    )
  })
}
// : Promise<currentCoords | string>
export async function getCurrentCoordinates() {
  if (!navigator.geolocation) {
    return 'Your browser does not support geolocation...'
  } else {
    try {
      const coordinates = await getCurrentPosition()
      return {
        lat: coordinates.latitude,
        lon: coordinates.longitude,
      }
    } catch (e) {
      return 'It is not possible to determine your geolocation'
    }
  }
}

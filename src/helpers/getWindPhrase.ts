const table = [
  { id: 1, name: 'Calm', maxSpeed: 0.5 },
  { id: 1, name: 'Light air', maxSpeed: 1.5 },
  { id: 1, name: 'Light breeze', maxSpeed: 3.3 },
  { id: 1, name: 'Gentle breeze', maxSpeed: 5.5 },
  { id: 1, name: 'Moderate breeze', maxSpeed: 7.5 },
  { id: 1, name: 'Fresh breeze', maxSpeed: 10.7 },
  { id: 1, name: 'Strong breeze', maxSpeed: 13.8 },
  { id: 1, name: 'High wind', maxSpeed: 17.1 },
  { id: 1, name: 'Gale', maxSpeed: 20.7 },
  { id: 1, name: 'Strong gale', maxSpeed: 24.4 },
  { id: 1, name: 'Storm', maxSpeed: 28.4 },
  { id: 1, name: 'Violent storm', maxSpeed: 32.6 },
  { id: 1, name: 'Hurricane', maxSpeed: 38 },
]

export const getWindPhrase = (speed: number) => {
  let wind = ''
  for (let el of table) {
    if (speed < el.maxSpeed) {
      wind = el.name
      break
    } else {
      wind = el.name
    }
  }

  return wind
}

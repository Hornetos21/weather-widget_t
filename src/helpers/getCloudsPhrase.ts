export const getCloudsPhrase = (percent: number): string => {
  switch (true) {
    case percent < 11:
      return 'Clear sky'
    case percent < 25:
      return 'Few clouds'
    case percent < 51:
      return 'Scattered clouds'
    case percent < 85:
      return 'Broken clouds'
    default:
      return 'Overcast clouds'
  }
}

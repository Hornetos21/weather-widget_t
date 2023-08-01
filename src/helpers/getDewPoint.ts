export const getDewPoint = (temp: number, humidity: number): number => {
  /*
   * for temps from -45 °C to 60 °C
   *
   * formula Ts = (b × α(T,RH)) / (a - α(T,RH))
   * Ts – Dew point (in degrees Celsius)
   * T – Temperature (in degrees Celsius)
   * RH - Relative humidity of the air (in percent)
   *
   * a and b are the Magnus coefficients
   *
   *  α(T,RH) = ln(RH/100) + aT/(b+T)
   * */

  const a = 17.625
  const b = 243.04

  const alpha = Math.log(humidity / 100) + (a * temp) / (b + temp)

  return Math.round((b * alpha) / (a - alpha))
}

<template>
  <div class="weather-card">
    <h1 class="city">London, UK</h1>
    <div class="main-info">
      <img src="../../../public/02d@4x.png" alt="" width="100" />
      <div class="main-info__temperature">7 C</div>
    </div>
    <em class="short-details">
      Feels like -3 C. Broken clouds. Light breeze
    </em>
    <div class="long-details">
      <div class="long-details__prop">
        <WindIcon />
        3.0m/s SSE
      </div>
      <div class="long-details__prop">
        <PressureIcon />
        1021hPa
      </div>
      <div class="long-details__prop">Humidity: 97%</div>
      <div class="long-details__prop">Dew point: 0%</div>
      <div class="long-details__prop">Visibility: 10.0km</div>
    </div>
  </div>
</template>

<script>
import PressureIcon from '../ui/icons/PressureIcon.vue'
import WindIcon from '../ui/icons/WindIcon.vue'

export default {
  components: { WindIcon, PressureIcon },
}
</script>

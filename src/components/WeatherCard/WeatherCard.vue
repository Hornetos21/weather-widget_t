<template>
  <li class="weather-card">
    <header class="header">
      <h1 class="title city">{{ city.name }},{{ city.country }}</h1>
    </header>
    <div class="main-info">
      <img src="../../../public/02d@4x.png" alt="" width="100" />
      <div class="main-info__temperature">{{ city.main.temp }} °C</div>
    </div>
    <em class="short-details">
      Feels like {{ city.main.feels }} °C. Broken clouds. Light breeze
    </em>
    <div class="long-details">
      <div class="long-details__prop">
        <WindIcon />
        {{ city.detail.wind.speed }}m/s SSE
      </div>
      <div class="long-details__prop">
        <PressureIcon />
        {{ city.detail.pressure }}hPa
      </div>
      <div class="long-details__prop">
        Humidity: {{ city.detail.humidity }}%
      </div>
      <div class="long-details__prop">Dew point: {{}}%</div>
      <div class="long-details__prop">
        Visibility: {{ city.detail.visibility / 1000 }}km
      </div>
    </div>
  </li>
</template>

<script lang="ts">
/*
Расчитать точку росы
Направление ветра
путь до картинок
 облака






*/

import PressureIcon from '../ui/icons/PressureIcon.vue'
import WindIcon from '../ui/icons/WindIcon.vue'
import { CityWeather } from '../../types'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  components: { WindIcon, PressureIcon },
  props: {
    city: {
      type: Object as PropType<CityWeather>,
      required: true,
    },
  },
})
</script>

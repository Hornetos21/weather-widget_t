<template>
  <li class="weather-card">
    <header class="header">
      <h1 class="title city">{{ city.name }},{{ city.country }}</h1>
    </header>
    <div class="main-info">
      <img
        :src="`https://openweathermap.org/img/wn/${city.main.icon}@2x.png`"
        :alt="city.main.main"
        width="100"
      />
      <div class="main-info__temperature">{{ city.main.temp }} °C</div>
    </div>
    <em class="short-details">
      Feels like {{ city.main.feels }} °C. {{ formatClouds }}.
      {{ windPhase }}
    </em>
    <div class="long-details">
      <div class="long-details__prop">
        <WindIcon />
        {{ city.detail.wind.speed }}m/s {{ windDirection }}
      </div>
      <div class="long-details__prop">
        <PressureIcon />
        {{ city.detail.pressure }}hPa
      </div>
      <div class="long-details__prop">
        Humidity: {{ city.detail.humidity }}%
      </div>
      <div class="long-details__prop">Dew point: {{ dewPoint }}%</div>
      <div class="long-details__prop">Visibility: {{ formatVisibility }}km</div>
    </div>
  </li>
</template>

<script lang="ts">
import PressureIcon from '../ui/icons/PressureIcon.vue'
import WindIcon from '../ui/icons/WindIcon.vue'
import { CityWeather } from '../../types'
import { defineComponent, PropType } from 'vue'
import { getWindDirection } from '../../helpers/getWindDirection'
import { getWindPhrase } from '../../helpers/getWindPhrase'
import { getCloudsPhrase } from '../../helpers/getCloudsPhrase'
import { getDewPoint } from '../../helpers/getDewPoint'

export default defineComponent({
  components: { WindIcon, PressureIcon },
  props: {
    city: {
      type: Object as PropType<CityWeather>,
      required: true,
    },
  },
  computed: {
    weatherShortPhase() {
      return `Feels like ${this.city.main.feels} °C. {{ formatClouds }}.
      {{ windPhase }}`
    },

    windDirection() {
      return getWindDirection(this.city.detail.wind.speed)
    },
    windPhase() {
      return getWindPhrase(this.city.detail.wind.speed)
    },
    formatClouds() {
      const first = this.city.main.description[0].toUpperCase()
      return `${first}${this.city.main.description.slice(1)}`
    },
    dewPoint() {
      return getDewPoint(this.city.main.temp, this.city.detail.humidity)
    },
    formatVisibility() {
      return Math.floor(this.city.detail.visibility / 1000).toFixed(1)
    },
  },
})
</script>

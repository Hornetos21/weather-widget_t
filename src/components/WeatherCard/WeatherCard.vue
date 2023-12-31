<template>
  <li class="weather-card">
    <div class="spinner-container" v-if="isLoading">
      <SpinnerIcon />
    </div>

    <the-header> {{ city.name }},{{ city.country }}</the-header>

    <div class="main-info">
      <img
        :src="`https://openweathermap.org/img/wn/${city.main.icon}@2x.png`"
        :alt="city.main.main"
      />
      <div class="main-info__temperature">{{ city.main.temp }} °C</div>
    </div>
    <em class="short-details">
      {{ weatherShortPhase }}
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
import { defineComponent, PropType } from 'vue'

import PressureIcon from '@/components/ui/icons/PressureIcon.vue'
import WindIcon from '@/components/ui/icons/WindIcon.vue'
import SpinnerIcon from '@/components/ui/icons/SpinnerIcon.vue'
import TheHeader from '@/components/ui/TheHeader.vue'

import { getWindDirection } from '../../helpers/getWindDirection'
import { getWindPhrase } from '../../helpers/getWindPhrase'
import { getDewPoint } from '../../helpers/getDewPoint'

import { CityWeather } from '../../types'

export default defineComponent({
  components: { TheHeader, SpinnerIcon, WindIcon, PressureIcon },
  props: {
    city: {
      type: Object as PropType<CityWeather>,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    weatherShortPhase() {
      return `Feels like ${this.city.main.feels} °C. ${this.formatClouds}.
      ${this.windPhase}`
    },

    windDirection() {
      return getWindDirection(this.city.detail.wind.deg)
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

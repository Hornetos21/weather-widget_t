<template>
  <div class="root">
    <div class="widget-container">
      <the-button class="btn--toggle" @click="toggleMode">
        <CloseIcon v-if="isSettingsMode" />
        <GearIcon v-else />
      </the-button>

      <!-- WEATHER -->
      <MainPage
        :error="error"
        :message="message"
        :is-settings-mode="isSettingsMode"
        :is-loading="isLoading"
        :cities="cities"
        :toggle-mode="toggleMode"
      />

      <!-- SETTING -->
      <SettingsPage
        :cities="cities"
        v-if="isSettingsMode"
        :removeCity="removeCity"
        :fetch-weather-by-name="fetchWeatherByName"
        :is-settings-mode="isSettingsMode"
        :showError="showError"
        :error="error"
        :reorder="reorderCities"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import MainPage from '@/pages/MainPage.vue'
import SettingsPage from '@/pages/SettingsPage/SettingsPage.vue'
import GearIcon from '@/components/ui/icons/GearIcon.vue'
import CloseIcon from '@/components/ui/icons/CloseIcon.vue'
import TheButton from '@/components/ui/TheButton.vue'

import { getWeatherByLocation } from './services/api/OpenWeatherApi'
import { getCurrentCoordinates } from './services/getCurrentLocation'
import { loadLocalStorage, saveLocalStorage } from './services/LocalStorage'
import { extractLocalCityWeather } from './helpers/extractLocalCity'
import {
  CityCoords,
  CityWeather,
  CoordinatesByName,
  OpenWeatherAPI,
} from './types'

export default defineComponent({
  components: {
    MainPage,
    TheButton,
    CloseIcon,
    GearIcon,
    SettingsPage,
  },

  data() {
    return {
      cities: [] as PropType<CityWeather>[],
      isSettingsMode: false,
      isLoading: false,
      timerId: null,
      weatherId: 'weather-docs-1',

      message: '',
      error: '',
    }
  },
  methods: {
    reorderCities(sorted: CityWeather[]) {
      this.cities = sorted
    },
    addCity(city: OpenWeatherAPI) {
      const cityWeather = extractLocalCityWeather(city)

      this.cities.push(cityWeather)
    },
    removeCity(city: CityWeather) {
      this.cities = this.cities.filter((el) => el.id !== city.id)

      if (!this.cities.length) {
        this.message = 'Add a city in the settings.'
      }
    },

    toggleMode() {
      this.isSettingsMode = !this.isSettingsMode
    },

    showError(error: string) {
      this.error = error
      setTimeout(() => (this.error = ''), 2000)
    },

    updateWeather() {
      const update5min = 5 * 60 * 1000

      this.timerId = setInterval(this.fetchWeather, update5min)
    },

    async fetchWeatherByCurrentCoords() {
      try {
        this.isLoading = true
        const res = await getCurrentCoordinates()

        await this.fetchWeather(res)
      } catch (e) {
        this.error = e.message

        setTimeout(() => {
          this.error = ''
          this.isSettingsMode = true
        }, 2000)
      }
    },

    async fetchWeather(coordinates?: CityCoords) {
      const cityCoords = this.cities.length
        ? this.cities
        : [{ coords: coordinates }]

      try {
        this.isLoading = true

        const weatherApi = await Promise.all(
          cityCoords.map((city: CityWeather) =>
            getWeatherByLocation(city.coords.lat, city.coords.lon)
          )
        )
        this.cities = weatherApi.map((el) => extractLocalCityWeather(el))
      } catch (e) {
        console.error(e.message)
        this.showError('Failed to load weather')
      } finally {
        this.isLoading = false
      }
    },

    async fetchWeatherByName(cityName: CoordinatesByName) {
      const isExist = this.cities.some(
        (el) => el.coords.lat.toFixed(2) === cityName.lat.toFixed(2)
      )

      if (isExist) {
        return this.showError('This city is already on the list.')
      } else {
        try {
          const cityWeather = await getWeatherByLocation(
            cityName.lat,
            cityName.lon
          )
          this.addCity(cityWeather)
        } catch (e) {
          console.error(e.message)
          this.showError('Failed to load city')
        }
      }
    },
  },
  async mounted() {
    this.cities = loadLocalStorage(this.weatherId)

    this.updateWeather()

    if (this.cities.length) {
      await this.fetchWeather()
    } else {
      this.message = `Please click on the allow access to your location data button or add a city in the settings.`

      await this.fetchWeatherByCurrentCoords()
      this.isLoading = false
      this.message = 'Add a city in the settings.'
    }
  },
  watch: {
    cities: {
      handler() {
        saveLocalStorage(this.weatherId, this.cities)
      },
      deep: true,
    },
  },
})
</script>

<style lang="scss">
@import 'main.scss';
</style>
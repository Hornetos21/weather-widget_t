<template>
  <div class="root">
    <div class="widget-container">
      <the-button class="btn--toggle" @click="toggleMode">
        <CloseIcon v-if="isSettingsMode" />
        <GearIcon v-else />
      </the-button>

      <!--      <div class="skeleton"></div>-->

      <!-- WEATHER -->
      <div class="container" v-if="!isSettingsMode">
        <Message v-if="!cities.length || error">
          <template v-slot:icon>
            <SpinnerIcon v-show="isLoading" />
            <CodeOrangeIcon size="40" v-show="message && !error" />
            <CodeRedIcon size="40" v-show="error" />
          </template>
          <template v-slot:message>{{ error || message }}</template>
        </Message>

        <!--SPINNER-->

        <!--        <div class="spinner" v-if="isLoading">-->
        <!--          <SpinnerIcon />-->
        <!--        </div>-->

        <WeatherList
          v-if="!isSettingsMode"
          :cities="cities"
          :toggle-mode="toggleMode"
          :is-settings-mode="isSettingsMode"
          :is-loading="isLoading"
          :message="message"
        />
      </div>

      <!--      SETTING -->
      <SettingsPage
        :cities="cities"
        v-if="isSettingsMode"
        :removeCity="removeCity"
        :fetch-and-add="fetchAndAdd"
        :is-settings-mode="isSettingsMode"
        :showError="showError"
        :error="error"
        :reorder="reorderCities"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SettingsPage from './pages/SettingsPage/SettingsPage.vue'
import GearIcon from './components/ui/icons/GearIcon.vue'
import CloseIcon from './components/ui/icons/CloseIcon.vue'
import TheButton from './components/ui/TheButton.vue'
import SpinnerIcon from './components/ui/icons/SpinnerIcon.vue'
import CodeOrangeIcon from './components/ui/icons/CodeOrangeIcon.vue'
import CodeRedIcon from './components/ui/icons/CodeRedIcon.vue'
import Message from './components/Message.vue'
import WeatherList from './components/WeatherList.vue'

import { getWeatherByLocation } from './services/api/OpenWeatherApi'
import { getCurrentCoordinates } from './services/getCurrentLocation'
import { loadLocalStorage, saveLocalStorage } from './services/LocalStorage'
import { extractLocalCityWeather } from './helpers/extractLocalCity'

export default defineComponent({
  components: {
    CodeOrangeIcon,
    Message,
    WeatherList,
    CodeRedIcon,
    SpinnerIcon,
    TheButton,
    CloseIcon,
    GearIcon,
    SettingsPage,
  },

  data() {
    return {
      cities: [],
      isSettingsMode: false,
      isLoading: false,
      timerId: null,
      weatherId: 'weather-widget-1',

      message: '',
      error: '',
    }
  },
  methods: {
    reorderCities(sorted) {
      this.cities = sorted
    },
    addCity(city) {
      const cityWeather = extractLocalCityWeather(city)

      this.cities.push(cityWeather)
    },
    removeCity(city) {
      this.cities = this.cities.filter((el) => el.id !== city.id)
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
      const res = await getCurrentCoordinates()

      if (typeof res === 'string') {
        this.error = res

        setTimeout(() => {
          this.error = ''
          this.isSettingsMode = true
        }, 2000)
      } else {
        await this.fetchWeather(res)
      }
    },

    async fetchWeather(coordinates?) {
      const cityCoords = this.cities.length
        ? this.cities
        : [{ coords: coordinates }]

      try {
        this.isLoading = true

        const weatherApi = await Promise.all(
          cityCoords.map((city) =>
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

    async fetchAndAdd(cityName) {
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
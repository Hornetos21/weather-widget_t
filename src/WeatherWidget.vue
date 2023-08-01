<template>
  <div class="root">
    <div class="widget-container">
      <!--      BUTTON -->

      <the-button class="btn--toggle" @click="toggleMode">
        <CloseIcon v-if="isSettingsMode" />
        <GearIcon v-else />
      </the-button>

      <!--     MESSAGE -->

      <div v-if="!isLoading && !cities.length && !isSettingsMode">
        <div class="block block--alert">
          <header class="header header--message">
            <CodeOrange size="50" />
            <h2 class="title">Message</h2>
          </header>
          <p>
            {{ error || message }}
          </p>
        </div>
      </div>

      <!-- MAIN PAGE-->

      <div class="spinner" v-if="isLoading">
        <SpinnerIcon />
      </div>

      <MainPage
        v-if="!isSettingsMode"
        :cities="cities"
        :toggle-mode="toggleMode"
        :is-settings-mode="isSettingsMode"
      />
      <!--      SETTING PAGE-->
      <SettingsPage
        :cities="cities"
        v-if="isSettingsMode"
        :removeCity="removeCity"
        :fetch-and-add="fetchAndAdd"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import MainPage from './pages/MainPage/MainPage.vue'
import SettingsPage from './pages/SettingsPage/SettingsPage.vue'
import GearIcon from './components/ui/icons/GearIcon.vue'
import CloseIcon from './components/ui/icons/CloseIcon.vue'
import TheButton from './components/ui/TheButton.vue'
import SpinnerIcon from './components/ui/icons/SpinnerIcon.vue'
import CodeOrange from './components/ui/icons/CodeOrange.vue'

import {
  getCoordinatesByCityName,
  getWeatherByLocation,
} from './api/OpenWeatherApi'
import { getCurrentCoordinates } from './helpers/getCurrentLocation'
import { extractLocalCityWeather } from './helpers/extractLocalCity'
import { loadLocalStorage, saveLocalStorage } from './helpers/LocalStorage'
import { CityWeather } from './types'

/*
 * Сделать таймер обновления данных о погоде
 *
 * Сообщения ошибок
 * Расположения спинера
 *
 *
 * */

export default defineComponent({
  components: {
    CodeOrange,
    SpinnerIcon,
    TheButton,
    CloseIcon,
    GearIcon,
    SettingsPage,
    MainPage,
  },

  data() {
    return {
      cities: [] as PropType<CityWeather[]>[],
      isSettingsMode: false,
      isLoading: false,
      timerId: null,

      message: '',
      error: '',
    }
  },
  methods: {
    reorderCities() {},
    addCity() {},
    removeCity(city) {
      console.log('test', city)
      this.cities = this.cities.filter((el) => console.log(el))
    },
    toggleMode() {
      this.isSettingsMode = !this.isSettingsMode
    },
    showError(error: string) {
      this.error = error
      setTimeout(() => (this.error = ''), 3000)
    },
    updateWeather() {
      const updateTime = 5 * 60 * 1000

      this.timerId = setInterval(this.fetchWeather, updateTime)
    },

    async fetchWeatherByCurrentCoords() {
      // !refactor
      this.message = `Please click on the allow access to your location data button or add a city in the settings.`

      const res = await getCurrentCoordinates()

      if (typeof res === 'string') {
        this.error = res
        // !refactor

        setTimeout(() => {
          this.error = ''
          this.isSettingsMode = true
        }, 2000)
      } else {
        await this.fetchWeather(res)
      }
      this.message = 'Add a city in the settings.'
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
      console.log(cityName)

      try {
        // const cityCoords = await getCoordinatesByCityName(cityName)
        const cityWeather = await getWeatherByLocation(
          cityName.lat,
          cityName.lon
        )

        this.cities.push(extractLocalCityWeather(cityWeather))
      } catch (e) {
        console.error(e.message)
        this.showError('Failed to load city')
      }
    },
  },
  async mounted() {
    this.cities = loadLocalStorage()

    this.updateWeather()

    if (this.cities.length) {
      await this.fetchWeather()
    } else {
      await this.fetchWeatherByCurrentCoords()
    }
  },
  watch: {
    cities: {
      handler() {
        saveLocalStorage(this.cities)
      },
      deep: true,
    },
  },
})
</script>

<style lang="scss">
@import 'main.scss';
</style>

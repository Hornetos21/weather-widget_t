<template>
  <div class="root">
    <div class="widget-container">
      <!--      BUTTON -->

      <the-button class="btn--toggle" @click="toggleMode">
        <CloseIcon v-if="isSettingsMode" />
        <GearIcon v-else />
      </the-button>

      <!--     MESSAGE -->

      <div v-if="!cities.length && !isSettingsMode">
        <header class="header">
          <CodeOrange size="50" />
          <h2 class="title">Message</h2>
        </header>
        <p class="block">
          Please click on the allow access to your location data button or add a
          city in the settings.
        </p>
      </div>

      <!-- MAIN PAGE-->

      <SpinnerIcon v-show="isLoading" />
      <MainPage
        v-show="!isSettingsMode"
        :cities="cities"
        :toggle-mode="toggleMode"
        :is-settings-mode="isSettingsMode"
      />
      <!--      SETTING PAGE-->
      <SettingsPage :cities="cities" v-show="isSettingsMode" />
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

import { getWeatherByLocation } from './api/OpenWeatherApi'
import { getCurrentCoordinates } from './helpers/getCurrentLocation'
import { extractLocalCityWeather } from './helpers/extractLocalCity'
import { loadLocalStorage, saveLocalStorage } from './helpers/LocalStorage'
import { CityWeather } from './types'

/*
 * Сделать таймер обновления данных о погоде
 * Условный рендеринг
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
      cities: [] as PropType<CityWeather>[],
      isSettingsMode: false,
      isLoading: false,
    }
  },
  methods: {
    toggleMode() {
      this.isSettingsMode = !this.isSettingsMode
    },
  },
  async mounted() {
    this.cities = loadLocalStorage()
    if (this.cities.length) return
    const res = await getCurrentCoordinates()
    if (typeof res === 'string') {
      this.message = res
    } else {
      try {
        const response = await getWeatherByLocation(res.lat, res.lon)
        this.isLoading = true
        this.cities.push(extractLocalCityWeather(response))
      } catch (e) {
        throw new Error(e.message)
      }
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

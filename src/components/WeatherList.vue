<template>
  <div class="list-wrapper">
    <ul class="weather-list">
      <WeatherCard
        v-for="city in cities"
        :key="city.id"
        :city="city"
        :is-loading="isLoading"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import WeatherCard from '@/components/WeatherCard/WeatherCard.vue'
import CloseIcon from '@/components/ui/icons/CloseIcon.vue'
import GearIcon from '@/components/ui/icons/GearIcon.vue'

import { CityWeather } from '../types'

export default defineComponent({
  components: {
    GearIcon,
    CloseIcon,
    WeatherCard,
  },
  props: {
    cities: {
      type: Array as PropType<CityWeather[]>,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    isSettingsMode: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
    },
  },
})
</script>

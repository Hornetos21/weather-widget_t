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

import { CityWeather } from '../types'

export default defineComponent({
  components: {
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
  },
})
</script>

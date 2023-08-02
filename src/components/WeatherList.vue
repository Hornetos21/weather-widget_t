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
import { defineComponent } from 'vue'
import WeatherCard from './WeatherCard/WeatherCard.vue'
import CloseIcon from './ui/icons/CloseIcon.vue'
import GearIcon from './ui/icons/GearIcon.vue'

export default defineComponent({
  components: {
    GearIcon,
    CloseIcon,
    WeatherCard,
  },
  props: {
    cities: {
      type: Array,
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

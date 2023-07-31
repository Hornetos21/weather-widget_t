<template>
  <div class="weather-container">
    <ul class="weather-list">
      <WeatherCard v-for="city in cities" :key="city.id" :city="city" />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WeatherCard from '../../components/WeatherCard/WeatherCard.vue'
import CloseIcon from '../../components/ui/icons/CloseIcon.vue'
import GearIcon from '../../components/ui/icons/GearIcon.vue'

export default defineComponent({
  name: 'MainPage',
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
  },
})
</script>

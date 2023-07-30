<template>
  <div class="weather-container">
    <button class="settings-btn" @click="toggleMode">
      <CloseIcon v-if="isSettingsMode" />
      <GearIcon />
    </button>

    <ul class="weather-list">
      <WeatherCard />
      <WeatherCard />
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
    isSettingsMode: {
      type: Boolean,
      required: true,
    },
    toggleMode: {
      type: Function,
      required: true,
    },
  },
})
</script>

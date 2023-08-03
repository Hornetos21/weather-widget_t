<template>
  <div class="container" v-if="!isSettingsMode">
    <Message v-if="!cities.length || error">
      <template v-slot:icon>
        <SpinnerIcon v-show="isLoading" />
        <CodeOrangeIcon v-show="message && !error && !isLoading" />
        <CodeRedIcon v-show="error" />
      </template>
      <template v-slot:message>{{ error || message }}</template>
    </Message>

    <WeatherList
      v-if="!isSettingsMode"
      :cities="cities"
      :toggle-mode="toggleMode"
      :is-settings-mode="isSettingsMode"
      :is-loading="isLoading"
      :message="message"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import CodeOrangeIcon from '@/components/ui/icons/CodeOrangeIcon.vue'
import SpinnerIcon from '@/components/ui/icons/SpinnerIcon.vue'
import Message from '@/components/Message.vue'
import CodeRedIcon from '@/components/ui/icons/CodeRedIcon.vue'
import WeatherList from '@/components/WeatherList.vue'

import { CityWeather } from '../types'

export default defineComponent({
  components: {
    WeatherList,
    CodeRedIcon,
    Message,
    SpinnerIcon,
    CodeOrangeIcon,
  },
  props: {
    toggleMode: {
      type: Function,
      required: true,
    },
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
      required: true,
    },
    error: {
      type: String,
      required: true,
    },
  },
})
</script>

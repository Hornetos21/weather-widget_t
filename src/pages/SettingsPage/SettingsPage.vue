<template>
  <div class="container">
    <the-header>Settings</the-header>

    <Message v-if="!cities.length || error" :is-settings-mode="isSettingsMode">
      <template v-slot:icon>
        <CodeOrangeIcon v-if="!error" />
        <CodeRedIcon v-else />
      </template>
      <template v-slot:message>{{ messagePhrase }}</template>
    </Message>

    <SettingsList :cities="cities" @remove="removeCity" @reorder="reorder" />
    <SettingsForm
      :cities="cities"
      @selected="fetchWeatherByName"
      @error="showError"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SettingsForm from '@/components/SettingsForm.vue'
import SettingsList from '@/components/SettingsList.vue'
import Message from '@/components/Message.vue'
import TheHeader from '@/components/ui/TheHeader.vue'
import CodeOrangeIcon from '@/components/ui/icons/CodeOrangeIcon.vue'
import CodeRedIcon from '@/components/ui/icons/CodeRedIcon.vue'

export default defineComponent({
  name: 'SettingPage',
  components: {
    TheHeader,
    SettingsForm,
    SettingsList,
    Message,
    CodeOrangeIcon,
    CodeRedIcon,
  },
  props: {
    cities: {
      type: Array,
      required: true,
    },
    removeCity: {
      type: Function,
    },
    fetchWeatherByName: {
      type: Function,
    },
    isSettingsMode: {
      type: Boolean,
    },
    showError: {
      type: Function,
      required: true,
    },
    error: {
      type: String,
      required: true,
    },
    reorder: {
      type: Function,
      required: true,
    },
  },
  computed: {
    messagePhrase() {
      return (
        this.error ||
        'Please enter the name of the city, where you want to find out the weather.'
      )
    },
  },
})
</script>

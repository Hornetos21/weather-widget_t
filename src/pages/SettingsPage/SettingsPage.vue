<template>
  <div class="settings-container">
    <header class="header">
      <h2 class="title">Settings</h2>
    </header>
    <SettingsList :cities="cities" />
    <SettingsForm :cities="cities" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import SettingsList from '../../components/SettingsList.vue'
import SettingsForm from '../../components/SettingsForm.vue'
import { CityWeather } from '../../types'

export default defineComponent({
  name: 'SettingPage',
  components: { SettingsForm, SettingsList },
  props: {
    cities: {
      type: Array,
      required: true,
    },
  },
})
</script>

<style lang="scss"></style>

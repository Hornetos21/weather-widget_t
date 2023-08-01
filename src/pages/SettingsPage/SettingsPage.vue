<template>
  <div class="settings-container">
    <header class="header">
      <h2 class="title">Settings</h2>
    </header>
    <SettingsList :cities="cities" @remove="removeCity" />
    <SettingsForm :cities="cities" @select="fetchAndAdd" />
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
    removeCity: {
      type: Function,
    },
    fetchAndAdd: {
      type: Function,
    },
  },
  // methods: {
  //   remove(city) {
  //     removeCity()
  //   },
  // },
})
</script>

<style lang="scss"></style>

<!--el.id !== city.id-->

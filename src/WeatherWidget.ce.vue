<template>
  <div class="widget-container">
    <MainPage />
    <SettingsPage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainPage from './pages/MainPage/MainPage.vue'
import SettingsPage from './pages/SettingsPage/SettingsPage.vue'

export default defineComponent({
  components: { SettingsPage, MainPage },

  data() {
    return {
      isSettingsMode: false,
    }
  },
  methods: {},
})
</script>

<style lang="scss">
@import 'main.scss';
</style>

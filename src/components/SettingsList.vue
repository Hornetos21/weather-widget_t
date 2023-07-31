<template>
  <ul class="settings-list" v-if="cities.length">
    <SettingsListItem v-for="city in cities" :key="city.id" :city="city" />
  </ul>
  <p class="block" v-else>
    Please enter the name of the city, where you want to find out the weather.
  </p>
</template>

<script lang="ts">
import SettingsListItem from './SettingsListItem.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { SettingsListItem },
  props: {
    cities: {
      type: Array,
      required: true,
    },
  },
})
</script>

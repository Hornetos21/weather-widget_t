<template>
  <ul class="settings-list" v-if="cities.length">
    <li v-for="city in cities" :key="city.id">
      <DNDIcon />
      {{ city.name }}, {{ city.country }}
      <the-button @click="removeCity">
        <TrashIcon />
      </the-button>
    </li>
  </ul>
  <p class="block" v-else>
    Please enter the name of the city, where you want to find out the weather.
  </p>
</template>

<script lang="ts">
import SettingsListItem from './SettingsListItem.vue'
import { defineComponent, PropType } from 'vue'
import DNDIcon from './ui/icons/DNDIcon.vue'
import TheButton from './ui/TheButton.vue'
import TrashIcon from './ui/icons/TrashIcon.vue'
import { CityWeather } from '../types'

export default defineComponent({
  components: { TrashIcon, TheButton, DNDIcon, SettingsListItem },
  props: {
    cities: {
      type: Array as PropType<CityWeather[]>,
      required: true,
    },
  },
  methods: {
    removeCity() {
      this.$emit('remove', this.city)
    },
    addCity() {},
    reorder() {},
  },
})
</script>

<!--     @remove="removeCity"-->

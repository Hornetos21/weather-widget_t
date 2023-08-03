<template>
  <ul class="settings-list" v-if="cities.length">
    <li
      class="settings-list__item"
      v-for="city in cities"
      :key="city.id"
      draggable="true"
      @dragstart="startDrag($event, city)"
      @drop.prevent="onDrop($event, city)"
      @dragover.prevent="onDragOver($event, city)"
      @dragleave.prevent="dragLeave($event)"
    >
      <DNDIcon />
      {{ city.name }}, {{ city.country }}
      <the-button @click="removeCity(city)">
        <TrashIcon />
      </the-button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import DNDIcon from '@/components/ui/icons/DNDIcon.vue'
import TheButton from '@/components/ui/TheButton.vue'
import TrashIcon from '@/components/ui/icons/TrashIcon.vue'

import { CityWeather } from '../types'

export default defineComponent({
  components: { TrashIcon, TheButton, DNDIcon },
  props: {
    cities: {
      type: Array as PropType<CityWeather[]>,
      required: true,
    },
  },
  data() {
    return {
      sortedCities: [] as PropType<CityWeather>[],
      currentCity: null as PropType<CityWeather>,
    }
  },
  methods: {
    sortingCities<T extends CityWeather>(currentCity: T, overCity: T) {
      this.sortedCities = this.cities.map((el: T) => {
        if (el.id === overCity.id) {
          return { ...currentCity }
        }
        if (el.id === currentCity.id) {
          return { ...overCity }
        }
        return el
      })
    },

    removeCity(city: CityWeather) {
      this.$emit('remove', city)
    },

    startDrag(e: DragEvent, currentCity: CityWeather) {
      this.currentCity = currentCity

      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
    },
    onDrop(e: DragEvent, overCity: CityWeather) {
      e.currentTarget.style.background = '#c8c8c8'

      this.sortingCities(this.currentCity, overCity)
      this.$emit('reorder', this.sortedCities)
    },
    onDragOver(e: DragEvent, city: CityWeather) {
      e.currentTarget.style.background = 'darkcyan'
    },

    dragLeave(e: DragEvent) {
      e.currentTarget.style.background = '#c8c8c8'
    },
  },
})
</script>

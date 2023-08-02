<!--@drop.prevent="onDrop($event, 'listCities')"
@dragover.prevent="onDragOver($event)"
@dragleave.prevent-->

<template>
  <ul class="settings-list" v-if="cities.length">
    <li
      v-for="city in cities"
      :key="city.id"
      draggable="true"
      @dragstart="startDrag($event, city)"
      @drop.prevent="onDrop($event, city)"
      @dragenter="dragEnter($event)"
      @dragend="dragEnd($event)"
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

import DNDIcon from './ui/icons/DNDIcon.vue'
import TheButton from './ui/TheButton.vue'
import TrashIcon from './ui/icons/TrashIcon.vue'

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
      sortedCities: [],
      currentCity: null,
    }
  },
  methods: {
    sortingCities(currentCity, overCity) {
      this.sortedCities = this.cities.map((el) => {
        if (el.id === overCity.id) {
          return { ...currentCity }
        }
        if (el.id === currentCity.id) {
          return { ...overCity }
        }
        return el
      })
    },

    removeCity(city) {
      this.$emit('remove', city)
    },

    startDrag(e: DragEvent, currentCity) {
      this.currentCity = currentCity

      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('itemID', currentCity.id)
    },
    onDrop(e: DragEvent, overCity) {
      e.currentTarget.style.background = '#c8c8c8'

      const itemID = +e.dataTransfer.getData('itemID')
      this.sortingCities(this.currentCity, overCity)
      this.$emit('reorder', this.sortedCities)
    },
    onDragOver(e: DragEvent, city) {
      // e.currentTarget.style.background = '#1a86d8'
      e.currentTarget.style.background = 'darkcyan'
    },

    dragLeave(e) {
      e.currentTarget.style.background = '#c8c8c8'
    },
    dragEnter(e) {},
    dragEnd(e) {},
  },
})
</script>

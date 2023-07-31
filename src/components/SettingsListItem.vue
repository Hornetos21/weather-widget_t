<template>
  <li>
    <DNDIcon />
    {{ city.name }}, {{ city.country }}
    <the-button>
      <TrashIcon />
    </the-button>
  </li>
</template>

<script lang="ts">
import TheButton from './ui/TheButton.vue'
import DNDIcon from './ui/icons/DNDIcon.vue'
import TrashIcon from './ui/icons/TrashIcon.vue'
import { defineComponent, PropType } from 'vue'
import { CityWeather } from '../types'

export default defineComponent({
  components: { TrashIcon, DNDIcon, TheButton },
  props: {
    city: {
      type: Object as PropType<CityWeather>,
      required: true,
    },
  },
})
</script>

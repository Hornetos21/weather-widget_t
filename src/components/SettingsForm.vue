<template>
  <form class="form" @submit.prevent="addLocation($event, _)">
    <label class="title" for="city">Add location:</label>
    <div class="form-input">
      <div class="wrapper-input">
        <input
          id="city"
          type="text"
          v-model="searchCity"
          @input="debouncedFetch"
          placeholder="Write the name of the city..."
        />
        <ul class="search-list" v-if="searchList.length">
          <li
            class="search-list__item"
            v-for="city in searchList"
            @click="addLocation($event, city)"
          >
            {{ city.name }}, {{ city.country }}
            <PlusIcon />
          </li>
        </ul>
      </div>
      <the-button type="submit">
        <EnterArrow />
      </the-button>
    </div>
  </form>
</template>

<script lang="ts">
import EnterArrow from './ui/icons/EnterArrow.vue'
import TheButton from './ui/TheButton.vue'
import PlusIcon from './ui/icons/PlusIcon.vue'

import { debounce } from '../helpers/debounce'
import { getCoordinatesByCityName } from '../services/api/OpenWeatherApi'

import { CoordinatesByName } from '../types'

export default {
  components: { PlusIcon, TheButton, EnterArrow },
  props: {
    cities: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchList: [] as CoordinatesByName[],
      searchCity: '',
    }
  },
  methods: {
    async fetchCityNames() {
      if (!this.searchCity.trim()) {
        this.searchList = []
        return
      }

      try {
        this.searchList = await getCoordinatesByCityName(this.searchCity)
      } catch (e) {
        console.error(e.message)
      }
    },
    addLocation(event: Event, city: CoordinatesByName) {
      if (!this.searchCity.trim()) return

      if (event.type === 'submit') {
        if (this.searchList.length) {
          this.$emit('select', this.searchList[0])
        } else {
          this.$emit('error', "Couldn't find the city.")
        }
      } else {
        this.$emit('select', city)
      }

      this.searchList = []
      this.searchCity = ''
    },
  },
  created() {
    this.debouncedFetch = debounce(this.fetchCityNames, 200)
  },

  watch: {
    searchCity(...args) {
      this.debouncedFetch(...args)
    },
  },
}
</script>
<template>
  <form class="form" @submit.prevent="addLocation">
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
            @click="addLocation(city)"
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
import { CoordinatesByName } from '../types'
import { debounce } from '../helpers/debounce'
import { getCoordinatesByCityName } from '../api/OpenWeatherApi'

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
    addLocation(city) {
      // console.log(city)
      this.$emit('select', city)
      this.searchList = []
      this.searchCity = ''

      // this.$emit('')
    },

    // performSearch: debounce(this.fetchCityNames),
  },
  created() {
    this.debouncedFetch = debounce(this.fetchCityNames)
  },

  watch: {
    searchCity(...args) {
      this.debouncedFetch(...args)
    },
    /*    searchCity(...args) {
      this.performSearch(...args)
    },*/
  },
}
</script>

<!--/*(newVal, oldVal) => {-->
<!--console.log('value changed: ', newVal, oldVal)-->
<!--//   API fetch-->
<!--}*/-->

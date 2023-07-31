<template>
  <form class="form" @submit.prevent="addLocation">
    <label class="title" for="city">Add location:</label>
    <div class="form-input">
      <div class="wrapper-input">
        <input id="city" type="text" v-model="city" />
        <ul class="search-list" v-if="searchList.length">
          <li class="search-list__item" v-for="city in searchList">
            {{ city.name }} <PlusIcon />
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
      city: '',
    }
  },
  mounted() {},
}
</script>

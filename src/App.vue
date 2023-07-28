<script setup lang="ts">
import TheButton from './components/ui/TheButton.vue'
</script>
<template>
  <div class="app">
    Hello
    <div class="app__box"></div>
    <div>
      <h1>{{ name }}</h1>
      <p>{{ count }}</p>
      <the-button @click="incrementCount(2)">Click</the-button>
      <button @click="incrementCount(2)">Increment</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  data() {
    return {
      name: 'Igor',
      count: 0,
    }
  },
  methods: {
    incrementCount(num: number) {
      this.count += num
    },
  },
})
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  &__box {
    width: 100px;
    height: 200px;
    background: black;
  }
}
</style>

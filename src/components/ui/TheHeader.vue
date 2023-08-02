<template>
  <header class="header">
    <h2 class="title">
      <slot></slot>
    </h2>
  </header>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'the-header',
})
</script>
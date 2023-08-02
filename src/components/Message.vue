<template>
  <div class="message-wrapper">
    <the-header v-if="!isSettingsMode"> Message</the-header>

    <div class="message">
      <slot name="icon"></slot>
      <p>
        <slot name="message"></slot>
      </p>
    </div>
  </div>

  <!--  <div class="spinner" v-if="isLoading">-->
  <!--    <SpinnerIcon />-->
  <!--  </div>-->
</template>

<script>
import { defineComponent } from 'vue'
import CodeOrange from './ui/icons/CodeOrange.vue'
import SpinnerIcon from './ui/icons/SpinnerIcon.vue'
import TheHeader from './ui/TheHeader.vue'

export default defineComponent({
  components: { TheHeader, SpinnerIcon, CodeOrange },
  props: {
    isSettingsMode: {
      type: Boolean,
    },
  },
})
</script>

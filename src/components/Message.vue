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
</template>

<script>
import { defineComponent } from 'vue'

import CodeOrange from '@/components/ui/icons/CodeOrangeIcon.vue'
import SpinnerIcon from '@/components/ui/icons/SpinnerIcon.vue'
import TheHeader from '@/components/ui/TheHeader.vue'

export default defineComponent({
  components: { TheHeader, SpinnerIcon, CodeOrange },
  props: {
    isSettingsMode: {
      type: Boolean,
    },
  },
})
</script>

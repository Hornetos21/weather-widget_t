<template>
  <div class="container">
    <the-header>Settings</the-header>
    <Message v-if="!cities.length || error" :is-settings-mode="isSettingsMode">
      <template v-slot:icon>
        <CodeOrange size="40" v-if="!error" />
        <CodeRed size="40" v-else />
      </template>
      <template v-slot:message
        >{{
          error ||
          'Please enter the name of the city, where you want to find out the weather.'
        }}
      </template>
    </Message>
    <SettingsList :cities="cities" @remove="removeCity" />
    <SettingsForm :cities="cities" @select="fetchAndAdd" @error="showError" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SettingsForm from '@/components/SettingsForm.vue'
import SettingsList from '@/components/SettingsList.vue'
import Message from '@/components/Message.vue'
import TheHeader from '@/components/ui/TheHeader.vue'
import CodeOrange from '@/components/ui/icons/CodeOrange.vue'
import CodeRed from '@/components/ui/icons/CodeRed.vue'

export default defineComponent({
  name: 'SettingPage',
  components: {
    TheHeader,
    SettingsForm,
    SettingsList,
    Message,
    CodeOrange,
    CodeRed,
  },
  props: {
    cities: {
      type: Array,
      required: true,
    },
    removeCity: {
      type: Function,
    },
    fetchAndAdd: {
      type: Function,
    },
    isSettingsMode: {
      type: Boolean,
    },
    showError: {
      type: Function,
      required: true,
    },
    error: {
      type: String,
      required: true,
    },
  },
  // methods: {
  //   remove(city) {
  //     removeCity()
  //   },
  // },
})
</script>

<!--el.id !== city.id-->

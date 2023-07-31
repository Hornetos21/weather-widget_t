// Custom element
import { createApp, defineCustomElement } from 'vue'
import WeatherWidget from './WeatherWidget.vue'

// const Widget = defineCustomElement(WeatherWidget)
//
// customElements.define('weather-widget', Widget)

const app = createApp(WeatherWidget)

app.mount('#app')

// declare module 'vue' {
//   export interface GlobalComponent {
//     Widget: typeof Widget
//   }
// }

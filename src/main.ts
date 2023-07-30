// Custom element
import { defineCustomElement } from 'vue'
import WeatherWidget from './WeatherWidget.ce.vue'

const Widget = defineCustomElement(WeatherWidget)

customElements.define('weather-widget', Widget)

// declare module 'vue' {
//   export interface GlobalComponent {
//     Widget: typeof Widget
//   }
// }

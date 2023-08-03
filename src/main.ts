// Custom element
import { createApp, defineCustomElement } from 'vue'
import './main.scss'
// import WeatherWidget from './WeatherWidget.vue'
import WeatherWidget from './WeatherWidget.ce.vue'

const Widget = defineCustomElement(WeatherWidget)

customElements.define('weather-widget', Widget)

// const app = createApp(WeatherWidget)
//
// app.mount('#app')

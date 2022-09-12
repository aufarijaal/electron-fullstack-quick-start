import { createApp } from "vue";
import App from "./App.vue";
import "vfonts/Inter.css";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/dark/css-vars.css";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount(document.body);

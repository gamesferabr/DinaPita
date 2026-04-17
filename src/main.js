import { createApp } from "vue";
import App from "./App.vue";
import { revealDirective } from "./directives/reveal.js";
import "../css/styles.css";
import "../css/shell.css";

const app = createApp(App);
app.directive("reveal", revealDirective);
app.mount("#app");

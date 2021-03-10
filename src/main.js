import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import Icon from '@/components/Icon';

Vue.config.productionTip = false;

Vue.component(Icon.name, Icon);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");

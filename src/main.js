import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import Icon from '@/components/Icon';
import PModal from '@/components/PModal';

Vue.config.productionTip = false;

Vue.component(Icon.name, Icon);
Vue.component(PModal.name, PModal);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");

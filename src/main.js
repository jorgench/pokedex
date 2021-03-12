import Vue from 'vue';
import App from './App.vue';
import store from './store';

import Icon from '@/components/Icon';
import Modal from '@/components/Modal';

import Toast from '@/plugin/toast';

Vue.config.productionTip = false;

Vue.component(Icon.name, Icon);
Vue.component(Modal.name, Modal);

Vue.use(Toast);

Vue.filter('capitalize', function(value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');

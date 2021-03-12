<template>
  <transition name="fade" mode="out-in">
    <component :is="ViewComponent"></component>
  </transition>
</template>
<script>
import Home from '@/views/Home';
import List from '@/views/List';

const routes = {
  '/': 'home',
  '/list': 'list',
};

export default {
  name: 'App',
  components: {
    Home,
    List,
  },
  data() {
    return {
      currentRoute: window.location.pathname,
    };
  },
  computed: {
    ViewComponent() {
      /*let routesSplit = this.currentRoute.split('/');

      if (routesSplit.length > 2) {
        routesSplit = routesSplit.slice(routesSplit.length,-1)
      }*/

      return routes[this.currentRoute] || 'NotFound';
    },
  },
  mounted() {
    window.history.replaceState({}, null, '');
    window.onpopstate = () => {
      this.currentRoute = window.location.pathname;
    };
  },
};
</script>

<style lang="scss">
@import './assets/style/normalize.css';
@import './assets/style/main.scss';
</style>

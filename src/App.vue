<template>
  <component :is="ViewComponent"></component>
</template>
<script>
import Home from '@/views/Home';
import List from '@/views/List';

const NotFound = { template: '<p>Page not found</p>' };

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

      return routes[this.currentRoute] || NotFound;
    },
  },
  mounted() {
    window.history.replaceState({}, null, '');
    window.onpopstate = () => {
      console.log('0');
      this.currentRoute = history.state;
    };
  },
};
</script>

<style lang="scss">
@import './assets/style/normalize.css';
@import './assets/style/main.scss';
</style>

<template>
  <section class="view flow">

    <div class="content-header">
      <div class="wrapper">
        <poke-search placeholder="Search"></poke-search>
      </div>
    </div>
    
    <div class="content-max">
      <poke-list></poke-list>


      <!--div class="wrapper center">
        <h1 class="title-1">
          Uh-oh!
        </h1>
        <p>You look lost on your journey!</p>

        <button class="btn">Go back home</button>
      </div-->

    </div>
    
    <div class="content-footer">
      <div class="wrapper">
        <div class="btn-group">
          <button v-for="(option, k) in options" :key="k" :class="['btn width-icon expanded', { 'disable': selected !== option.label }]" @click="selected = option.label">
            <icon :icon="option.icon"></icon>
            <span>{{option.label}}</span>
          </button>
        </div>
      </div>
    </div>
      
  </section>
</template>

<script>
import PokeSearch from '@/components/PokeSearch';
import PokeList from '@/components/PokeList';

export default {
  name: 'List',
  components: {
    PokeSearch,
    PokeList
  },
  data() {
    return {
      selected: 'All',
      options: [
        {
          label: 'All',
          icon: 'list'
        },
        {
          label: 'Favorites',
          icon: 'start'
        }
      ]
    }
  },
}
</script>
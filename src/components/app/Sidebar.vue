<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
    <router-link 
    v-for="link of links"
    :key="link.title"
    tag="li"
    :to="link.url"
    active-class="active"
    :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'sidebar',

  model: {
    prop: 'isOpen'
  },

  props: {
    isOpen: Boolean
  },

  data() {
    return {
      links: [
        {title: 'Счет', url: '/', exact: true},
        {title: 'История', url: '/history'},
        {title: 'Планирование', url: '/planning'},
        {title: 'Новая запись', url: '/record'},
        {title: 'Категории', url: '/categories'},
      ]
    }
  },
}
</script>
<template>
  <div class="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import Empty from '@/layouts/EmptyLayout';
import Main from '@/layouts/MainLayout';

export default {
  components: {
    Empty,
    Main
  },

  computed: {
    layout() {
      return this.$route.meta.layout || 'Empty';
    }
  }
}
</script>

<style lang="scss">
@import '~materialize-css/sass/materialize.scss';
@import '@/assets/style.scss';
</style>
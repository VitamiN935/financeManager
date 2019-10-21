<template>
  <div>
    <div class="grey darken-1 empty-layout">
       <router-view />
    </div>
  </div>
</template>

<script>
import messages from '@/plugins/messages'

export default {
  name: 'emptylayout',

  computed: {
    error() {
      return this.$store.getters.error;
    }
  },

  watch: {
    error(e) {
      console.log(e);
      this.$error(messages[e.code] || 'Что-то пошло не так');
    }
  }
}
</script>
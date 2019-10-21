<template>
  <div>
    <Loader v-if="loading"/>
    <div class="app-main-layout" v-else>
      <Navbar @toggleSidebar="isOpen=!isOpen" />
      <Sidebar v-model="isOpen" />

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import Loader from "@/components/app/Loader";

export default {
  name: "mainLayout",

  data() {
    return {
      isOpen: true,
      loading: true
    };
  },

  components: {
    Navbar,
    Sidebar,
    Loader
  },

  async mounted() {
    try {
      await this.$store.dispatch("fetchInfo");
      this.loading = false;
    } catch (e) {}
  }
};
</script>
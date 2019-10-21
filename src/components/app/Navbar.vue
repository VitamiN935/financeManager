<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('toggleSidebar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{date | date('datetime')}}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a class="dropdown-trigger black-text" href="#" data-target="dropdown" ref="trigger">
            {{userName}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",

  data() {
    return {
      date: new Date(),
      dropdown: null,
      intervalDate: null
    };
  },

  computed: {
    userName() {
      return this.$store.getters.info.name;
    }
  },

  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.trigger);
    this.intervalDate = setInterval(() => {
      this.date = new Date();
    }, 1000);
  },

  beforeDestroy() {
    clearInterval(this.intervalDate);
    if (this.dropdown.destroy) this.dropdown.destroy();
  },

  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/login?message=logout');
    }
  }
};
</script>
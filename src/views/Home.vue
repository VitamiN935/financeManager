<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading"/>
    <div class="row" v-else>
      <Homebill :rates='currency.rates'/>
      <HomeCurrency :rates='currency.rates' :date='new Date(currency.date)'/>
    </div>
  </div>
</template>

<script>
import Homebill from '@/components/Homebill';
import HomeCurrency from '@/components/HomeCurrency';
import Loader from '@/components/app/Loader'

export default {
  name: 'home',

  components: {
    Homebill,
    HomeCurrency,
    Loader,
  },

  data() {
    return {
      loading: true,
      currency: null
    }
  },

  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.loading = false;
  },

  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    }
  },
}
</script>
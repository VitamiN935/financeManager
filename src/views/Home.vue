<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <div class="row">
      <Homebill />
      <HomeCurrency />
    </div>
  </div>
</template>

<script>
import Homebill from '@/components/Homebill';
import HomeCurrency from '@/components/HomeCurrency';

export default {
  name: 'home',

  components: {
    Homebill,
    HomeCurrency
  }
}
</script>
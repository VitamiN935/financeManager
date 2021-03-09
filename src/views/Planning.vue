<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>
    <Loader v-if="loading"/>
    <p v-else-if="!categories.length" class="center">
      Категорий не найдено ->
      <router-link to="/categories">Создать категорию</router-link>
    </p>

    <section v-else>
      <div v-for="category of categories" :key="category.id">
        <p>
          <strong>{{category.title}}:</strong>
          {{category.spend | currency('RUB')}} из {{category.limit | currency('RUB')}}
        </p>
        <div class="progress">
          <div 
          class="determinate" 
          :class="category.color"
          :style="`width:${category.currencyPercent}%`"></div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
import { mapGetters } from "vuex";

export default {
  name: "planning",

  components: {
    Loader
  },

  computed: {
    ...mapGetters(["info"])
  },

  data() {
    return {
      loading: true,
      categories: []
    };
  },

  async mounted() {
    try {
      const categories = (await this.$store.dispatch("fetchCategories")) || [];
      const records = (await this.$store.dispatch("fetchRecords")) || [];
      this.categories = categories.map(category => {
        const spend = records
          .filter(record => record.type === "outcome")
          .filter(record => record.categoryType === category.id)
          .reduce((total, rec) => (total += rec.amount), 0);
        const percent = (spend * 100) / category.limit;
        const currencyPercent = percent > 100 ? 100 : percent;
        const color = percent >= 100 ? "red" : percent >= 60 ? "green" : "blue";
        return {
          ...category,
          spend,
          currencyPercent,
          color
        };
      });

      this.loading = false;
    } catch (e) {}
  }
};
</script>
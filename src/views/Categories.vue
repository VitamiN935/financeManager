<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <CategoryCreate @created='addNewCategory'/>
        <CategoryEdit :categories='categories' @update='updateCategories' :key="categories.length + updateCount"/>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
import Loader from '@/components/app/Loader'

export default {
  name: 'categories',

  components: {
    CategoryCreate,
    CategoryEdit,
    Loader
  },

  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0,
    }
  },

  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },

  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },

    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++
    }
  },
}
</script>
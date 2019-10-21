<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoriesCreate @created='addNewCategory'/>
        <CategoriesEdit />
      </div>
    </section>
  </div>
</template>

<script>
import CategoriesCreate from '@/components/CategoriesCreate'
import CategoriesEdit from '@/components/CategoriesEdit'

export default {
  name: 'categories',

  components: {
    CategoriesCreate,
    CategoriesEdit,
  },

  data() {
    return {
      categories: []
    }
  },

  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    }
  },
}
</script>
<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="editCategory">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c of categories" :key="c.id" :value="c.id">{{c.title}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input 
          type="text" 
          id="name" 
          v-model.trim="title" 
          :class="{invalid: $v.title.$dirty && !$v.title.required}" />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >Введите название</span>
        </div>

        <div class="input-field">
          <input 
          id="limit" 
          type="number" 
          v-model.number="limit"
          :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          />
          <label for="limit">Лимит</label>
           <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >Минимальная величина {{$v.limit.$params.minValue.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import constants from "@/script/constants";

export default {
  name: "categoryedit",

  props: {
    categories: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      select: null,
      current: null,
      title: "",
      limit: ""
    };
  },

  validations: {
    title: {
      required
    },
    limit: {
      minValue: minValue(constants.MINVALUE)
    }
  },

  watch: {
    current(id) {
      const category = this.categories.find(c => c.id === id);
      this.title = category.title;
      this.limit = category.limit;
    }
  },

  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },

  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },

  methods: {
    async editCategory() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const category = {
        id: this.current,
        title: this.title,
        limit: this.limit
      };

      try {
        await this.$store.dispatch('updateCategory', category);
        this.$message('Категория обновлена');
        this.$emit('update', category);
      } catch (e) {}

    }
  }
};
</script>
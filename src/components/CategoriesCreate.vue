<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="createCategories">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          />
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
          Создать
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
  name: "categoriescreate",

  data() {
    return {
      title: "",
      limit: 1
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

  mounted() {
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },

  methods: {
    async createCategories() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        const category = await this.$store.dispatch("createCategories", {
          title: this.title,
          limit: this.limit
        });

        this.title = '';
        this.limit = 100;
        this.$v.$reset();

        this.$message('Создана категория');
        this.$emit('created', category);
      } catch (e) {}
    }
  }
};
</script>
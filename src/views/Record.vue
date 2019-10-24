<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />
    <p v-else-if="!categories.length" class="center">
      Категорий не найдено ->
      <router-link to="/categories">Создать категорию</router-link>
    </p>
    <form class="form" @submit.prevent="createRecord" v-else>
      <div class="input-field">
        <select ref="select" v-model="selectCategory">
          <option
            v-for="category of categories"
            :key="category.id"
            :value="category.id"
          >{{category.title}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        />
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >Минимальное значение {{$v.amount.$params.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        />
        <label for="description">Описание</label>
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >Укажите описание записи</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
import { required, minValue } from "vuelidate/lib/validators";
import constants from "@/script/constants";

export default {
  name: "record",

  components: {
    Loader
  },

  data() {
    return {
      loading: true,
      categories: [],
      amount: 1,
      description: "",
      type: "outcome",
      selectCategory: null
    };
  },

  validations: {
    amount: {
      minValue: minValue(constants.MIN_VALUE_RECORD)
    },

    description: {
      required
    }
  },

  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.selectCategory = this.categories[0].id;
    this.loading = false;
    setTimeout(() => {
      M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },

  methods: {
    async createRecord() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const record = {
        amount: this.amount,
        description: this.description,
        type: this.type,
        categoryType: this.selectCategory,
        date: new Date().toJSON()
      };

      try {
        await this.$store.dispatch("createRecord", record);
        this.$message("Добавлена запись");

        (this.description = ""),
          (this.type = "outcome"),
          (this.amount = constants.MIN_VALUE_RECORD);
        this.$v.$reset();
      } catch (e) {}
    }
  }
};
</script>
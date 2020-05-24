<template>
  <div class="relative pb-4">
    <label :for="name" class="text-blue-500 uppercase text-xs font-bold absolute">{{label}}</label>
    <input
      :id="name"
      type="text"
      :placeholder="placeholder"
      autocomplete="none"
      class="pt-8 w-full border-b pb-2 focus:outline-none focus:border-blue-400 text-gray-900"
      :class="errorClassOgject(name)"
      v-model="value"
      @input="updateField(name)"
    />
    <p class="text-red-600" v-text="errorMessage(name)"></p>
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: ["name", "label", "placeholder", "errors", "data"],
  data: function() {
    return {
      value: ""
    };
  },
  computed: {
    hasError(field) {
      return (
        this.errors &&
        this.errors[this.name] &&
        this.errors[this.name].length > 0
      );
    }
  },
  methods: {
    updateField(field) {
      this.clearErrors(field);
      this.$emit("update:field", this.value);
    },
    errorMessage(field) {
      if (this.hasError) {
        return this.errors[field][0];
      }
    },
    clearErrors(field) {
      if (this.hasError) {
        this.errors[field] = null;
      }
    },
    errorClassOgject(field) {
      return {
        "error-field": this.hasError
      };
    }
  },
  watch: {
    data(val) {
      this.value = val;
    }
  }
};
</script>

<style scoped>
.error-field {
  @apply .border-red-500 .border-b-2;
}
</style>
<template>
  <div>
    <form @submit.prevent="submitForm">
      <InputField
        name="name"
        label="Contact Name"
        placeholder="Contact Name"
        @update:field="form.name = $event"
        :errors="errors"
      />
      <InputField
        name="email"
        label="Contact Email"
        placeholder="Contact Email"
        @update:field="form.email = $event"
        :errors="errors"
      />
      <InputField
        name="company"
        label="Company"
        placeholder="Company"
        @update:field="form.company = $event"
        :errors="errors"
      />
      <!-- <InputField
        name="birthday"
        label="Birthday"
        placeholder="MM/DD/YYYY"
        @update:field="form.birthday = $event"
      />-->

      <div class="flex justify-end">
        <button class="py-2 px-4 rounded text-red-700 border mr-5 hover:border-red-700">Cancel</button>
        <button
          type="submit"
          class="bg-blue-500 py-2 px-4 rounded text-white hover:bg-blue-400"
        >Add New Contact</button>
      </div>
    </form>
  </div>
</template>

<script>
import InputField from "../InputField";
export default {
  components: {
    InputField
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        company: "",
        birthday: ""
      },
      errors: null
    };
  },
  methods: {
    submitForm() {
      axios
        .post("/api/contacts", this.form)
        .then(res => {
          this.$router.push(res.data.links.self);
        })
        .catch(err => {
          this.errors = err.response.data.errors;
        });
    }
  }
};
</script>

<style>
</style>
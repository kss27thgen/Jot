<template>
  <div>
    <div>
      <div class="flex justify-between">
        <a href="#" class="text-blue-400" @click="$router.back()">Back</a>
      </div>
      <form @submit.prevent="submitForm" class="mt-5">
        <InputField
          name="name"
          label="Contact Name"
          placeholder="Contact Name"
          @update:field="form.name = $event"
          :data="form.name"
          :errors="errors"
        />
        <InputField
          name="email"
          label="Contact Email"
          placeholder="Contact Email"
          :data="form.email"
          @update:field="form.email = $event"
          :errors="errors"
        />
        <InputField
          name="company"
          label="Company"
          placeholder="Company"
          :data="form.company"
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
          <button
            type="submit"
            class="bg-blue-500 py-2 px-4 rounded text-white hover:bg-blue-400"
          >Update Contact</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import InputField from "../InputField";
import Loader from "./Loader";
export default {
  components: {
    InputField,
    Loader
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        company: "",
        birthday: ""
      },
      errors: null,
      loading: true
    };
  },
  methods: {
    submitForm() {
      axios
        .patch("/api/contacts/" + this.$route.params.id, this.form)
        .then(res => {
          this.$router.push(res.data.links.self);
        })
        .catch(err => {
          this.errors = err.response.data.errors;
        });
    }
  },
  mounted() {
    axios
      .get("/api/contacts/" + this.$route.params.id)
      .then(res => {
        this.loading = false;
        this.form = res.data.data;
      })
      .catch(err => {
        this.loading = false;
        if (err.response.status === 404) {
          this.$router.push("/contacts");
        }
      });
  }
};
</script>

<style>
</style>
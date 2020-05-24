<template>
  <div>
    <div v-if="loading">
      <Loader />
    </div>
    <div v-else>
      <div class="flex justify-between">
        <a href="#" class="text-blue-400" @click="$router.back()">Back</a>
        <div class="relative">
          <router-link
            class="px-4 py-2 text-sm text-green-500 rounded border border-green-500 font-bold"
            :to="'/contacts/' + contact.contact_id + '/edit'"
          >Edit</router-link>
          <a
            href="#"
            class="px-4 py-2 text-sm text-red-500 rounded border border-red-500 font-bold"
            @click="modal = !modal"
          >Delete</a>
          <div
            v-if="modal"
            class="absolute bg-blue-900 rounded-lg z-20 text-white p-8 w-64 right-0 mt-2 mr-6"
          >
            <p>Are you sure you want to delete this record?</p>
            <div class="flex items-center mt-6 justify-end">
              <button class="text-white pr-4" @click="modal = !modal">Cancel</button>
              <button
                class="px-4 py-2 bg-red-500 rounded text-sm font-bold text-white"
                @click="destroy"
              >Delete</button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center pt-6">
        <UserCircle :name="contact.name" />
        <p class="pl-5 text-xl">{{ contact.name }}</p>
      </div>
      <p class="pt-6 text-gray-600 font-bold uppercase text-sm">Contact</p>
      <p class="pt-2 text-blue-400">{{ contact.email }}</p>
      <p class="pt-6 text-gray-600 font-bold uppercase text-sm">Company</p>
      <p class="pt-2 text-blue-400">{{ contact.company }}</p>
    </div>
  </div>
</template>

<script>
import UserCircle from "../UserCircle.vue";
import Loader from "./Loader";

export default {
  name: "ContactsShow",
  components: {
    UserCircle,
    Loader
  },
  data() {
    return {
      contact: null,
      loading: true,
      modal: false
    };
  },
  methods: {
    destroy() {
      axios
        .delete(`/api/contacts/${this.$route.params.id}`)
        .then(() => this.$router.push("/contacts"))
        .catch(() => alert("Internal Error"));
    }
  },
  mounted() {
    axios
      .get("/api/contacts/" + this.$route.params.id)
      .then(res => {
        this.contact = res.data.data;
        this.loading = false;
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
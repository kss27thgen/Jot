<template>
  <div>
    <div
      v-if="focus"
      @click="handleClick"
      class="bg-black opacity-25 absolute right-0 left-0 top-0 bottom-0 z-10"
    ></div>

    <div class="relative z-10">
      <input
        class="w-64 mr-6 bg-gray-200 border border-gray-400 pl-8 pr-3 py-1 rounded-full focus:outline-none focus:border-blue-500"
        type="text"
        placeholder="Search.."
        id="searchTerm"
        v-model="searchTerm"
        @input="search"
        @focus="focus = true"
      />

      <div
        v-if="focus"
        class="absolute bg-blue-900 text-white rounded-lg p-4 w-96 right-0 mr-6 mt-2 shadow z-20"
      >
        <div v-if="results == 0">Waiting results for '{{ searchTerm }}'</div>
        <div v-for="(result, i) in results" :key="i" @click="handleClick">
          <router-link :to="result.links.self" class="py-2 block">
            <div class="flex items-center">
              <UserCircle :name="result.data.name" />
              <div class="pl-3">
                <p>{{result.data.name}}</p>
                <p>{{result.data.company}}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import UserCircle from "./UserCircle";
export default {
  components: {
    UserCircle
  },
  data() {
    return {
      searchTerm: "",
      results: [],
      focus: false
    };
  },
  methods: {
    search: _.debounce(function(e) {
      axios
        .post("/api/search", { searchTerm: this.searchTerm })
        .then(res => {
          this.results = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }, 1000),
    handleClick() {
      this.focus = false;
      this.searchTerm = "";
    }
  }
};
</script>

<style>
</style>
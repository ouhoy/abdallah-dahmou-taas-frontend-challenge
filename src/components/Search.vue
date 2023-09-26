<script setup lang="ts">
import {ref} from 'vue'
import SearchResults from "@/components/SearchResults.vue";

interface Repo {
  name: string,
  id: number,

}

const search = ref("");
const searchMethod = ref("name");


const {repositories, userName} = defineProps<{ repositories: Repo[], userName: string }>()


function filteredRepos() {

  return repositories?.filter((repo: Repo) => {

    if (searchMethod.value === "id") return repo.id.toString().includes(search.value);

    if (searchMethod.value === "name") return repo.name.toLowerCase().includes(search.value.toLowerCase());


  });
}


</script>


<template>


  <div class="search-container md-16">

    <form>


      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input autocomplete="off" type="search" id="default-search" v-model="search"
               class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-inset focus:ring-2 focus:ring-indigo-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
               :placeholder="`Search repositories by ${searchMethod}...`"  required>

        <div>


          <button type="submit"
                  class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Search Repositories
          </button>


        </div>

      </div>
      <div class="mt-3 flex gap-3 items-center">


        <select id="search-filter" v-model="searchMethod"
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="name">Name</option>
          <option value="id">ID</option>

        </select>
      </div>

    </form>

  </div>

  <SearchResults :searchMethod="searchMethod" v-if="search" :userName="userName"
                 :repositories="filteredRepos()"></SearchResults>


</template>npm run serve


<style scoped>
.search-container {
  margin: 64px auto;
  max-width: 1200px;
  width: 95%;
}
</style>
<script setup lang="ts">
import {ref, watch} from "vue";


const {repositories} = defineProps<{

  repositories: any[],

}>()


const emit = defineEmits()


const search = ref("");
const searchResults = ref([] as any[])
const searchMethod = ref("name");


watch(search, () => {

  if (!search.value) {
    searchResults.value = []
    return;
  }
  searchResults.value = repositories.filter((repo) => {

    if (searchMethod.value === "name") return repo.name.toLowerCase().includes(search.value.toLowerCase())
    if (searchMethod.value === "id") return repo.id.toString().includes(search.value)

  });


})

function handleClick(repository: string) {
  search.value = ""
  emit("select", repository)
}

</script>

<template>
  <div class="search-container">

    <div class="relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
             fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      <input style="width: 1200px" v-model="search" type="search" id="default-search"
             class="block w-80 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="Search Mockups, Logos..." required>
    </div>

    <!--  Search  -->

    <div class="search-results rounded-lg border">
      <p class="border-t border-gray-700 dark:border-gray-400 p-4 hover:bg-gray-200 dark:hover:bg-gray-600"
         v-for="repo in searchResults"
         @click="handleClick(repo.name)">{{ repo.name }}</p>

    </div>
  </div>


</template>

<style scoped>

.search-container {
  position: relative;
}

.search-results {
  position: absolute;
  background: white;
  width: 1200px;
  top: 64px;
  z-index: 1;
}

.search-results > p:first-child {
  border-top: none;
}

</style>



<script setup lang="ts">
import {ref, watch} from "vue";

const {repositories} = defineProps<{

  repositories: any[]
}>()

const error = ref("")


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
    <input v-model="search" autocomplete="nope" placeholder="Search"/>
    <div class="search-results">
      <p v-for="repo in searchResults" @click="handleClick(repo.name)">{{ repo.name }}</p>

    </div>
  </div>

</template>

<style scoped>

.search-container {
  position: relative;
}

.search-results {
  position: absolute;
  background: black;
  color: white;
  top: 24px;
}

</style>



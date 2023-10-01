<script setup lang="ts">


import type {Octokit} from "@octokit/rest";
import {onMounted, ref} from "vue";

const {octokit} = defineProps<{
  octokit: Octokit
}>()

const repositories = ref<any[]>([])
const error = ref("")

// Get Repositories
onMounted(async () => {
  try {
    const {data} = await octokit.repos.listForAuthenticatedUser();
    repositories.value = data;
  } catch (e) {
    window.history.pushState(null, "", "/");
    console.error(`Error: ${(e as Error).message}`);
    error.value = `${(e as Error).message}. Please try again!`;
  }
})


</script>

<template>
  <h1>Repo</h1>
  <ul>
        <li v-for="repo in repositories" :key="repo.id">{{ repo.name }}</li>
  </ul>
</template>

<style scoped>

</style>
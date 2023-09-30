<script setup lang="ts">

import RepositoryDetails from "@/components/RepositoryDetails.vue";
import {ref} from "vue";

interface Repo {
  name: string,
  id: number,

}

const {repositories, userName, searchMethod} = defineProps<{ repositories: Repo[], userName: string, searchMethod: string }>();
const selectedRepository = ref("");


function handleClick(repo: Repo) {
  selectedRepository.value = repo.name
}

</script>


<template>


  <div v-if="repositories?.length && !selectedRepository" class="repo-container ">
    <h1 class="mb-2.5">Results:</h1>
    <div class="jobs-table relative overflow-x-auto shadow sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            ID
          </th>

          <th scope="col" class="px-6 py-3">
            Title
          </th>
        </tr>
        </thead>

        <tbody>
        <tr @click="handleClick(repo)" v-for="repo in repositories"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ repo.id }}
          </th>
          <td class="px-6 py-4">
            {{ repo.name }}
          </td>
        </tr>

        </tbody>
      </table>

    </div>

  </div>

  <div v-else-if="repositories.length == 0" class="repo-container ">

    <h1>Oops! It seems that a repository with that {{ searchMethod}} is not available 🫣</h1>
  </div>

  <RepositoryDetails v-if="selectedRepository" :userName="userName" :repository="selectedRepository"/>
</template>


<style>
.repo-container {
  width: 95%;
  max-width: 1200px;
  margin: 64px auto;

}


</style>
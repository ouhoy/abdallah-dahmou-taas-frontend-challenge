<script setup lang="ts">
import axios from "axios";
import {ref} from "vue";

const {repository, userName} = defineProps<{ repository: string, userName: string }>();


const commits = ref([])

axios
    .get(`https://api.github.com/repos/${userName}/${repository}/commits`)
    .then((response) => {
      commits.value = response.data;
      console.log(response.data)

    })
    .catch((error) => {
      console.error("Error: ", error)
    })

</script>

<template>
  <div class="repo-container">


    <ol v-for="commit in commits" class="relative border-l border-gray-200 dark:border-gray-700">
      <li class="mb-10 ml-6">
        <span
            class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <img class="rounded-full shadow-lg" :src="commit?.author.avatar_url" alt="Bonnie image"/>
        </span>
        <div
            class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
          <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{{ commit.commit.author.date }}
          </time>
          <div class="text-sm font-normal text-gray-500 dark:text-gray-300" about="_blank"><a :href="commit?.html_url"
                                                                               class="font-semibold text-blue-600 dark:text-blue-500 hover:underline">{{ commit.commit.message }}</a>
            to <span
                class="bg-gray-100 text-gray-800 text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300">Funny Group</span>
          </div>
        </div>
      </li>


    </ol>

  </div>
</template>

<style scoped>

</style>
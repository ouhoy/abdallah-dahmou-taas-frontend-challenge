<script setup lang="ts">
import axios from "axios";
import {ref} from "vue";
import getCommits from "@/composables/getCommits";

const {repository, userName} = defineProps<{ repository: string, userName: string }>();
const URI = `https://api.github.com/repos/${userName}/${repository}`;

const commits = ref([])
const branches = ref([])
const selectedBranch = ref("")


getCommits(`${URI}/commits`, commits)


// Get available branches
axios
    .get(`${URI}/branches`)
    .then((res) => {
      branches.value = res.data;
      selectedBranch.value = res.data[0].name;

    })
    .catch((err) => {
      console.error("Error: ", err)
    });

function handleBranchChange() {
  getCommits(`${URI}/commits?sha=${selectedBranch.value}`, commits)

}


</script>

<template>
  <div class="repo-container">

    <select v-model="selectedBranch" @change="handleBranchChange" id="search-filter"
            class="mb-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option v-for="branch in branches" :value="branch.name">{{
          branch.name
        }}
      </option>


    </select>
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
                                                                                              class="font-semibold text-blue-600 dark:text-blue-500 hover:underline">{{
              commit.commit.message
            }}</a>

          </div>
        </div>
      </li>


    </ol>

  </div>
</template>

<style scoped>

</style>
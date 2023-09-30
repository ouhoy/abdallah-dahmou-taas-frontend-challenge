<template>
  <div class="flex items-center justify-center mt-16 space-x-4">
    <img class="w-20 h-20 rounded-full" :src="avatarUrl" :alt="userName"/>
    <div class="font-medium dark:text-white">
      <div>{{ userName }}</div>
      <div class="text-sm text-gray-500 dark:text-gray-400">{{ followers }} followers</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, defineProps} from 'vue';
import axios from 'axios';

interface GitHubUserData {
  login: string;
  avatar_url: string;
  followers: number;
}

const {userName} = defineProps<{ userName: string }>();

const fullName = ref('');
const avatarUrl = ref('');
const followers = ref(0);

onMounted(() => {
  axios
      .get<GitHubUserData>(`https://api.github.com/users/${userName}`)
      .then((response) => {
        fullName.value = response.data.login;
        avatarUrl.value = response.data.avatar_url;
        followers.value = response.data.followers;
      })
      .catch((error) => {
        console.error(error);
      });
});
</script>

<style scoped>

</style>

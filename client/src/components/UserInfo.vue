<script setup lang="ts">
import type {Octokit} from "@octokit/rest";
import {onMounted, ref} from "vue";

const {octokit} = defineProps<{
  octokit: Octokit
}>()

const name = ref("");
const avatar = ref("");


onMounted(async () => {
  //Get User Data
  try {
    const response = await octokit.users.getAuthenticated();
    const user = response.data;
    name.value = user.name !== null ? user.name : user.login;
    avatar.value = user.avatar_url;
  } catch (e) {
    console.error('Error:', e);

  }
})


</script>

<template>
<div v-if="name">
  <img :src="avatar" width="64" :alt="name">
  <p>{{ name}}</p>
</div>
</template>

<style scoped>

</style>
<script setup lang="ts">

import {onMounted, ref} from "vue";
import {Octokit} from "@octokit/rest"
import RepositoriesListing from "@/components/RepositoriesListing.vue";
import UserInfo from "@/components/UserInfo.vue";

const accessToken = ref("");
const isAuth = ref(false)
const error = ref("")

function handleClick() {
  console.log(import.meta.env.VITE_CLIENT_ID)
  window.location.assign(`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}`)
}

let octokit: Octokit;

onMounted(async () => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");

  if (!codeParam) return;

  // Get token
  try {

    const URI = `http://localhost:4000/getAccessToken?code=${codeParam}`;
    const response = await fetch(URI, {method: "GET"});

    if (response.ok) {

      const data = await response.json();
      accessToken.value = data.access_token;

    }

  } catch (e) {
    window.history.pushState(null, "", "/");

    isAuth.value = false
    error.value = `${e}. Please try again!`;

  }

  octokit = new Octokit({auth: `token ${accessToken.value}`});
  isAuth.value = true;

})


</script>

<template>
  <div v-if="!isAuth">

    <button @click="handleClick">Login with github</button>
  </div>
  <div v-if="error">
    {{ error }}
  </div>

  <div v-if="isAuth">
    <UserInfo :octokit="octokit"/>
    <RepositoriesListing :octokit="octokit"/>
  </div>
</template>

<style scoped>

</style>
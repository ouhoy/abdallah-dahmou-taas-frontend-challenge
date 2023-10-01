<script setup lang="ts">

import {onMounted, ref} from "vue";
import {Octokit} from "@octokit/rest"
import RepositoriesListing from "@/components/RepositoriesListing.vue";

const accessToken = ref("");
const repositories = ref<any[]>([])
const error = ref("")
const octokitInstance = ref();

function handleClick() {
  console.log(import.meta.env.VITE_CLIENT_ID)
  window.location.assign(`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}`)
}

onMounted(async () => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");

  if (!codeParam) return;

  // Get token
  try {
    const response = await fetch(`http://localhost:4000/getAccessToken?code=${codeParam}`, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      accessToken.value = data.access_token;
    }

  } catch (e) {
    window.history.pushState(null, "", "/");

    console.error(`${e}. Please try again!`)
    error.value = `${e}. Please try again!`;

  }


  const octokit = new Octokit({auth: `token ${accessToken.value}`});

  // Get Repositories
  octokit.repos.listForAuthenticatedUser()
      .then(({data}) => {
        repositories.value = data;

      })
      .catch((e) => {
        window.history.pushState(null, "", "/");

        console.error(`Error: ${e.message}`);
        error.value = `${e.message}. Please try again!`;
      });

  //Get User Data
  try {
    const response = await octokit.users.getAuthenticated();
    const user = response.data;
    console.log(user);
  } catch (e) {
    console.error('Error:', e);

  }


})


</script>

<template>
  <div v-if="!repositories.length">

    <button @click="handleClick">Login with github</button>
  </div>
  <div v-if="error">
    {{ error }}
  </div>

  <div v-if="repositories.length">
    <RepositoriesListing :repositories="repositories"/>
  </div>
</template>

<style scoped>

</style>
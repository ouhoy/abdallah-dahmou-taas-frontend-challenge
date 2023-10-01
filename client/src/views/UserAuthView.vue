<script setup lang="ts">

import {onMounted, ref} from "vue";
import {Octokit} from "@octokit/rest"
import * as process from "process";

const accessToken = ref("");
const repositories = ref<any[]>([])

function handleClick() {
  window.location.assign(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`)
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

  } catch (error) {
    console.error(`There is an error fetching the data: ${error}`)
  }


  const octokit = new Octokit({auth: `token ${accessToken.value}`});


  // Get Repositories
  octokit.repos.listForAuthenticatedUser()
      .then(({data}) => {
        repositories.value = data;

      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
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
  <button @click="handleClick">Login with github</button>
</template>

<style scoped>

</style>
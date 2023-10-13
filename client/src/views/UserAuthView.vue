<script setup lang="ts">

import {onMounted, ref} from "vue";
import {Octokit} from "@octokit/rest"

import RepositoriesListing from "@/components/RepositoriesListing.vue";
import UserInfo from "@/components/UserInfo.vue";
import Search from "@/components/Search.vue";

import getRepositories from "@/composables/getRepositories";
import getAccessToken from "@/composables/getAccessToken";
import RepositoryCommits from "@/components/RepositoryCommits.vue";

const error = ref("")
const repos = ref([] as any[])
const name = ref("")
const username = ref("")
const avatar = ref("")
const commits = ref([] as any[]);


let octokit: Octokit;

onMounted(async () => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");

  if (!codeParam) return;

  const {accessToken} = await getAccessToken(codeParam, error)


  octokit = new Octokit({auth: `token ${accessToken.value}`});

  const {repositories} = await getRepositories(octokit, error);
  repos.value = repositories.value;


  // Get User Info
  try {
    const response = await octokit.users.getAuthenticated();
    const user = response.data;

    username.value = user.login;
    name.value = user.name !== null ? user.name : user.login;
    avatar.value = user.avatar_url;

  } catch (e) {
    console.error(e);
    error.value = `${e}, please try gain!`;
  }


})

function handleClick() {
  window.location.assign(`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}`)
}

function handleSelect(repository: string) {
  console.log("Selected", repository)
  octokit.repos.listCommits({
    owner: username.value,
    repo: repository
  }).then(({data}) => {

    commits.value = []

    data.forEach((commit) => {
      console.log('Commit Title:', commit.commit.message);
      commits.value.push(commit.commit.message)
    });

  })
      .catch((error) => {
        console.error(error);
      });
}

</script>

<template>
  <div class="container">

    <div v-if="!repos.length">

      <button @click="handleClick">Login with github</button>
    </div>
    <div v-if="error">
      {{ error }}
    </div>
    <div class="menu" v-if="repos.length > 0">
      <UserInfo :name="name" :avatar="avatar"/>
      <Search @select="handleSelect" :repositories="repos"/>

    </div>
    <div v-if="repos.length" class="commits">
      <RepositoryCommits :commits="commits"/>
    </div>
  </div>


</template>

<style>
.container {
  display: flex;
  flex-direction: row;
}

.menu {
  flex: 30%;
}

.commits {
  flex: 70%;
}
</style>
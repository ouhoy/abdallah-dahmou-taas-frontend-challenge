<script setup lang="ts">

import {createCommentVNode, onMounted, ref} from "vue";
import type {Ref} from "vue";
import {Octokit} from "@octokit/rest"

interface UserInfo {
  username: string;
  name: string;
  avatar: string;
}

import UserInfo from "@/components/UserInfo.vue";
import RepositoryCommits from "@/components/RepositoryCommits.vue";
import Search from "@/components/Search.vue";

import getRepositories from "@/composables/getRepositories";
import getAccessToken from "@/composables/getAccessToken";
import getUserInfo from "@/composables/getUserInfo";
import AuthButton from "@/components/AuthButton.vue";
import getCommits from "@/composables/getCommits";

const error = ref("")
const commits = ref([] as any[]);
const repositories = ref([] as any[])
const userInfo: Ref<UserInfo> = ref({
  username: "",
  name: "",
  avatar: "",
});
const selectedRepository = ref("");

let octokit: Octokit;


onMounted(async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");

  if (!codeParam) return;

  const {accessToken} = await getAccessToken(codeParam, error)
  octokit = new Octokit({auth: `token ${accessToken.value}`});

  repositories.value = (await getRepositories(octokit)).repositories.value;
  userInfo.value = (await getUserInfo(octokit)).userInfo.value;

})

function handleClick() {
  window.location.assign(`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}`)
}

async function handleSelect(repository: string) {
  selectedRepository.value = repository;

  commits.value = await getCommits(octokit, repository, userInfo.value.username)
  console.log("Ok: ", commits.value)

}

</script>

<template>
  <div class="flex flex-col items-center justify-center gap-8">


    <AuthButton v-if="!repositories.length" @click="handleClick">Login with github</AuthButton>

    <div class="error" v-if="error">
      {{ error }}
    </div>


  </div>

  <div class="flex flex-col justify-start gap-8 h-screen" v-if="repositories.length > 0">

    <UserInfo :name="userInfo.name" :avatar="userInfo.avatar"/>
    <Search @select="handleSelect" :repositories="repositories"/>
    <RepositoryCommits :repo="selectedRepository" :commits="commits"/>

  </div>

</template>

<style>


.error {
  color: crimson;
}


</style>
<script setup lang="ts">

import {onMounted, ref} from "vue";
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
import AuthButton from "@/components/AuthButton.vue";

import getRepositories from "@/composables/getRepositories";
import getAccessToken from "@/composables/getAccessToken";
import getUserInfo from "@/composables/getUserInfo";
import getCommits from "@/composables/getCommits";
import getBranches from "@/composables/getBranches";

const error = ref("")
const commits = ref([] as any[]);
const branches = ref([] as any[])
const repositories = ref([] as any[])
const selectedRepository = ref("");
const userInfo: Ref<UserInfo> = ref({
  username: "",
  name: "",
  avatar: "",
});

let octokit: Octokit;


onMounted(async () => {

  // URL Params
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");

  if (!codeParam) return;

  // Authenticate user
  const {accessToken} = await getAccessToken(codeParam, error)
  octokit = new Octokit({auth: `token ${accessToken.value}`});

  // Assign repositories and user info
  repositories.value = (await getRepositories(octokit)).repositories.value;
  userInfo.value = (await getUserInfo(octokit)).userInfo.value;

})

function handleClick() {
  window.location.assign(`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}`)
}

async function handleSelect(repository: string) {

  commits.value = await getCommits(octokit, repository, userInfo.value.username)
  branches.value = await getBranches(octokit, repository, userInfo.value.username)
  selectedRepository.value = repository;
}

async function handleBranchChange(branch: string) {

  commits.value = await getCommits(octokit, selectedRepository.value, userInfo.value.username, branch)

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
    <RepositoryCommits @branchChange="handleBranchChange" :branches="branches" :commits="commits"/>

  </div>

</template>

<style>


.error {
  color: crimson;
}


</style>
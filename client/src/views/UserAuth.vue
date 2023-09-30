<script setup lang="ts">
import {onMounted, ref} from 'vue'
import UserAvatar from "@/components/UserAvatar.vue";
import Search from "@/components/Search.vue";


const userName = ref("")
const repositories = ref([])

const CLIENT_ID = "b9c1d1c590ff8a10fd11"
const CLIENT_SECRETS = "ea1a47d31d8ad6fa0f34fa77dc60a055e8e344e1"

onMounted(async () => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");

  if (!codeParam) return;

  const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRETS}&code=${codeParam}`;

  await fetch(`https://github.com/login/oauth/access_token${params}`, {
  method: "GET",
    headers: {
      "Accept": "application/json",
    }
  })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)

      })


})

function handleSubmit() {

  window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`)

}


</script>


<template>


  <div v-if="repositories.length === 0" class="flex items-center h-screen flex-col justify-center  user-auth">


    <button @click="handleSubmit" type="button"
            class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
      <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
           viewBox="0 0 20 20">
        <path fill-rule="evenodd"
              d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
              clip-rule="evenodd"/>
      </svg>
      Sign in with Github
    </button>

  </div>

  <UserAvatar v-if="repositories.length" :userName="userName"/>
  <Search v-if="repositories.length" :userName="userName" :repositories="repositories"/>

</template>


<style scoped>


input {
  outline: none;
}
</style>
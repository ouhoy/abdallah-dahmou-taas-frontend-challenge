<script setup lang="ts">
import {ref} from 'vue'
import axios from "axios";
import UserAvatar from "@/components/UserAvatar.vue";
import Search from "@/components/Search.vue";


const userName = ref("")
const userNameError = ref("")
const repositories = ref([])
const isLoading = ref(false)

function handleSubmit() {

  userNameError.value = !userName ? "User name is required" : ""
  isLoading.value = true

  axios
      .get(`https://api.github.com/users/${userName.value}/repos`)
      .then((response) => {
        console.log(userName)
        console.log(response.data)
        repositories.value = response.data;
      })
      .catch((error) => {
        userNameError.value = !userName ? "Username is required" : "Username does not exist"
        console.error("Error: ", error)
      })
      .finally(() => {
        isLoading.value = false
      });
}


</script>


<template>


  <div v-if="repositories.length === 0" class="flex items-center h-screen flex-col justify-center  user-auth">

    <form @submit.prevent="handleSubmit">

      <div class="mt-6 flex max-w-md gap-x-4 items-center ">


        <input id="email-address" type="text" v-model="userName"
               class="w-80 min-w-0  text-gray-800 flex-auto rounded-md border-2 bg-white/5 px-3.5 py-2  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"

               placeholder="Enter your github username"/>

        <button type="submit"
                class="flex-none rounded-md bg-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300">
          {{ isLoading ? `Loading...` : 'Show Repositories' }}
        </button>


      </div>

      <p v-if="userNameError" class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span>
        {{ userNameError }}</p>

    </form>

  </div>

  <UserAvatar v-if="repositories.length" :userName="userName"/>
  <Search v-if="repositories.length" :repositories="repositories"/>

</template>


<style scoped>


input {
  outline: none;
}
</style>
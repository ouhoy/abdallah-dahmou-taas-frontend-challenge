<template>
  <div class="flex items-center h-screen flex-col justify-center  user-auth">

    <form @submit.prevent="handleSubmit">

      <div class="mt-6 flex max-w-md gap-x-4 items-center ">


        <input id="email-address" type="text" v-model="userName"
               class="w-80 min-w-0 flex-auto rounded-md border-2 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"

               placeholder="Enter your github username"/>

        <button type="submit"
                class="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
          Show Repositories
        </button>


      </div>

      <p v-if="userNameError" class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span>
        {{ userNameError }}</p>

    </form>

  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({

  data() {
    return {
      userName: "",
      userNameError: ""
    }
  },
  methods: {
    handleSubmit() {
      this.userNameError = !this.userName ? "User name is required" : ""

    }
  }
})

</script>


<style scoped>


input {
  outline: none;
}
</style>
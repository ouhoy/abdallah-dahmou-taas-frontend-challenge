<script lang="ts">
import {defineComponent} from 'vue'
import axios from "axios";

interface GitHubUserData {
  login: string;
  avatar_url: string;
  followers: number

}

export default defineComponent({
  name: "UserAvatar",
  props: {"userName": String},

  data() {
    return {
      fullName: "",
      avatarUrl: "",
      followers: 0

    }
  },

  mounted() {

    axios.get<GitHubUserData>(`https://api.github.com/users/${this.userName}`)
        .then(response => {
          this.fullName = response.data.login;
          this.avatarUrl = response.data.avatar_url;
          this.followers = response.data.followers

        }).catch(error=>{

          console.error(error)
    })

  }
})
</script>


<template>


  <div class="flex items-center justify-center mt-16 space-x-4">
    <img class="w-20 h-20 rounded-full" :src="avatarUrl" :alt="userName">
    <div class="font-medium dark:text-white">
      <div>{{userName}}</div>
      <div class="text-sm text-gray-500 dark:text-gray-400">{{followers}} followers</div>
    </div>
  </div>


</template>

<style scoped>

</style>


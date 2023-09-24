

<template>

  <UserAuth />

</template>

<script lang="ts">
import {defineComponent} from 'vue';
import UserAuth from "@/components/UserAuth.vue";
import "./index.css"

export default defineComponent({
  name: 'App',
  components: {
    UserAuth,
  }
});
</script>

<style>
#app {

}


</style>

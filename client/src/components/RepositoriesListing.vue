<script setup lang="ts">


const {repositories} = defineProps<{

  repositories: any[]
}>()


</script>

<template>
  <h1>Repo</h1>
  <ul>
    <li v-for="repo in repositories" :key="repo.id">{{ repo.name }}</li>
  </ul>
</template>

<style scoped>

</style>
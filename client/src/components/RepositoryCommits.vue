<script setup lang="ts">

const {commits} = defineProps<{
  commits: any[]
}>()

console.log("The commits", commits)
</script>

<template>
  <div v-for="commit in commits">
    <p>{{ commit }}</p>
  </div>
</template>

<style scoped>

</style>
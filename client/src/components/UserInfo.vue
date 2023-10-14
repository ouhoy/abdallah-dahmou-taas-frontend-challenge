<script setup lang="ts">

const {avatar, name} = defineProps<{
  avatar: string,
  name: string
}>()


</script>

<template>
  <div class="flex flex-col items-center space-y-2" v-if="name">
    <img class="rounded-full " :src="avatar" width="64" :alt="name">
    <p class="font-bold">{{ name }}</p>
  </div>
</template>

<style scoped>

</style>
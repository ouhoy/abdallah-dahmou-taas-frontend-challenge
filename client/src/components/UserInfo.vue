<script setup lang="ts">

const { avatar, name} = defineProps<{

  avatar: string,
  name: string
}>()



</script>

<template>
<div v-if="name">
  <img :src="avatar" width="64" :alt="name">
  <p>{{ name}}</p>
</div>
</template>

<style scoped>

</style>
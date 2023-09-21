<script lang="ts">

export default {
  props: {"repositories": Array}

}

</script>

<template>
  <div class="repo-container">
    <div class="jobs-table relative overflow-x-auto shadow sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            ID
          </th>

          <th scope="col" class="px-6 py-3">
            Title
          </th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="repo in repositories" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ repo.id }}
          </th>
                <td class="px-6 py-4">
          {{ repo.name }}
        </td>
        </tr>

        </tbody>
      </table>

    </div>
  </div>
</template>

<style scoped>
.repo-container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
<template>
  <thead
    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
  >
    <tr>
      <th
        scope="col"
        v-for="product in productHeaders"
        :key="product.id"
        class="px-6 py-3"
      >
        {{ product.name }}
      </th>
    </tr>
  </thead>
</template>

<script setup>
import { ref } from "vue";
const productHeaders = ref([
  { id: 1, name: "Product name" },
  { id: 2, name: "Product ID" },
  { id: 3, name: "Category" },
  { id: 4, name: "Price" },
   { id: 5, name: "Action" },
  { id: 6, name: "Description" },
  { id: 7, name: "Upload Date" },
]);
const fileHeaders = ref([
  { id: 7, name: "File name" },
  { id: 8, name: "File ID" },
  { id: 9, name: "Category" },
  { id: 10, name: "Description" },
   { id: 11, name: "Description" },
  { id: 12, name: "Action" },
]);
</script>

<style scoped></style>

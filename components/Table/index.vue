<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <div>
           <AddButton />
        </div>
      
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
           <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
           Products Table
            <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400"> You can add products, delete products and download QR of products</p>
        </caption>
       <TableHeading/>
        <tbody>
            <TableContent/>
        </tbody>
    </table>
</div>

</template>

<script setup>
import AddButton from './AddButton.vue';


</script>

<style  scoped>

</style>
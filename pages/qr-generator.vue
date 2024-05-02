<template>
  <div class="flex items-center justify-between">
    <BreadCrumb  location="QR-generator"/>

    <div class="rounded-md shadow-sm" role="group">
      <nuxt-link to="/qr-scanner">
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Scan
        </button>
      </nuxt-link>
      <nuxt-link to="/qr-generator">
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Create
        </button>
      </nuxt-link>
    </div>
  </div>

  <div class="flex items-center justify-center">
    <div
      class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <qrcode-vue
        id="qrcode"
        :value="storeProduct.valueQR"
        :level="level"
        :render-as="renderAs"
        :size="size"
        :margin="margin"
      />

      <div class="p-5 flex flex-col justify-start">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          QR generator
        </h5>

        <textarea
          v-model="storeProduct.valueQR"
          id="message"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>

        <button
          @click="downloadQR"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Download
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import QrcodeVue from "qrcode.vue";
import type { Level, RenderAs } from "qrcode.vue";

const storeProduct = useMyProductStore();

const size = ref(300);

const level = ref<Level>("M");
const renderAs = ref<RenderAs>("canvas");
const margin = ref<number>(1);

function downloadQR() {
  // Check if a QR code has been generated

  const canvas = document.querySelector("#qrcode");

  // Create a new anchor element
  const link = document.createElement("a");

  // Set the href attribute of the anchor element to the data URL of the QR code canvas
  link.href = canvas.toDataURL("image/png2");

  // Set the download attribute of the anchor element to specify the file name
  link.download = "qrcode.png";

  // Programmatically click the anchor element to trigger the download
  link.click();
}
</script>

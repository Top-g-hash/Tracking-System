<template>
  <div class="flex items-center justify-between">
    <BreadCrumb location="QR-scanner"/>

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
      <qrcode-stream
        :paused="paused"
        @detect="onDetect"
        @error="onError"
        @camera-on="resetValidationState"
      >
        <div v-if="validationSuccess" class="validation-success">
          
          Success: You may add it!!!
        </div>

        <div v-if="validationFailure" class="validation-failure">
         Failed to detect data!!!
        </div>

        <div v-if="validationPending" class="validation-pending">
          Long validation in progress...
        </div>
      </qrcode-stream>

      <div class="p-5">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          QR Scanner
        </h5>
      <qrcode-capture
      @detect="onDetect"
      :capture="selected.value"
    />
        <label
          for="message"
          class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
          >(Upload QR)</label
        >
        <div v-if="result" class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">QR code data</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
          <b>{{ result }}</b>
        </p>
    <button  @click="addNewProduct" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Add Product
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </button>
</div>

        
      </div>
    </div>
  </div>
</template>
<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
export default {
  components: { QrcodeStream,QrcodeCapture },

  data() {
    const options = [
      { text: "rear camera (default)", value: "environment" },
      { text: "front camera", value: "user" },
      { text: "force file dialog", value: null },
    ];
    return {
      client:useSupabaseClient(),
      isValid: undefined,
      paused: false,
      result: null,
      options,
      selected: options[0],
    };
  },

  computed: {
    validationPending() {
      return this.isValid === undefined && this.paused;
    },

    validationSuccess() {
      return this.isValid === true;
    },

    validationFailure() {
      return this.isValid === false;
    },
  },

  methods: {
    onDetect(detectedCodes) {
      console.log(detectedCodes);

      this.result = JSON.stringify(detectedCodes.map((code) => code.rawValue));
    },

    onError: console.error,

    resetValidationState() {
      this.isValid = undefined;
    },

    async onDetect([firstDetectedCode]) {
      this.result = firstDetectedCode.rawValue;
      this.paused = true;

      // pretend it's taking really long
      await this.timeout(3000);
      this.isValid = this.result.startsWith("");

      // some more delay, so users have time to read the message
      await this.timeout(2000);
      this.paused = false;
    },
async addNewProduct() {
  try {
    const parsed_result=JSON.parse(this.result)
    console.log(parsed_result);
    const { data, error } = await client
      .from("Products_2")
      .insert([
        {
       parsed_result
        },
      ]).select()
      
    if (data) {
     
      setProductDescription.value = "";
      setCategory.value = "";
      setProductName.value = "";
      setProductPrice.value = 0;
      storeProduct.setModal = false;
    }
    if(error) throw error
  } catch (e) {
    console.log(e);
  }
},
    timeout(ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms);
      });
    },
  },
};
</script>
<style scoped>
.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  color: black;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
}
</style>

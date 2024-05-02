import { defineStore } from "pinia";
import { ref } from "vue";

export const useMyProductStore = defineStore("myProductStore", () => {
  const valueQR = ref("");

  const setModal = ref(false);

  const openModal = () => {
    setModal.value = true;
  };
  const closeModal = () => {
    setModal.value = false;
  };

  // const setValue =(()=>{
  //  valueQR.value = `
  // product_id:${id.value},
  //  product_name:${name.value},
  //   product_category:${category.value},
  //   product_description: ${description.value},
  //   product_price: ${price.value}`
  // })
  return {
    valueQR,
   
    setModal,
    openModal,
    closeModal,
  };
});

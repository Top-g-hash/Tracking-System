<template>
  <tr
    v-for="product in setProducts"
    :key="product.product_id"
    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
  >
    <th
      scope="row"
      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    >
      {{ product.product_name }}
    </th>
    <td class="px-6 py-4">
      {{ product.product_id }}
    </td>
    <td class="px-6 py-4">
      {{ product.product_category }}
    </td>
    <td class="px-6 py-4">
      {{ product.product_price }}
    </td>
    <td class="px-6 py-4">
      <DropdownMenu>
        <DropdownMenuTrigger
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          >edit</DropdownMenuTrigger
        >
        <DropdownMenuContent
          class="py-2 text-sm text-gray-700 dark:text-gray-200"
        >
          <DropdownMenuItem
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            @click="storeProduct.openModal"
            >Add Product</DropdownMenuItem
          >
          <!-- <DropdownMenuItem
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            @click=""
            >Update Product</DropdownMenuItem
          > -->
          <DropdownMenuItem
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            @click="deleteProduct(product.product_id)"
            >Delete Product</DropdownMenuItem
          >
          <DropdownMenuItem
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            @click="
              downloadQR(
                product.product_id,
                product.product_name,
                product.product_price,
                product.product_description,
                product.product_category
              )
            "
            >Dowload QR code</DropdownMenuItem
          >
        </DropdownMenuContent>
      </DropdownMenu>
    </td>
    <td class="px-6 py-4">
      {{ product.product_description }}
    </td>
    <td class="px-6 py-4">
      {{ product.created_at }}
    </td>
  </tr>
</template>

<script lang="ts" setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const router = useRouter();
const client = useSupabaseClient();

interface Product {
  created_at: string;
  product_category: string;
  product_description: string;
  product_id: string;
  product_name: string;
  product_price: string;
}

const setProducts = ref<Product[]>([
  // {
  //   created_at: "dsdd",
  //   product_category: "dasdsa",
  //   product_description: "sdsad",
  //   product_id: "sddad",
  //   product_name: "assad",
  //   product_price: "asdasd",
  // },
]);
const storeProduct = useMyProductStore();

const deleteProduct = async (product: string) => {
  try {
    const { data, error } = await client
      .from("Products_2")
      .delete()
      .eq("product_id", product);

    deleteProductCLient(product);

    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
};
// const updateProduct = async (product: string) => {
//   try {

// const { data, error } = await client
//   .from('Products_2')
//   .update({ other_column: 'otherValue' })
//   .eq('some_column', 'someValue')
//   .select()

//     if (error) throw error;
//   } catch (error) {
//     console.log(error);
//   }
// };
const downloadQR = (
  id: string,
  name: string,
  price: string,
  description: string,
  category:string
) => {
storeProduct.valueQR = `{product_id:"${id}",product_name:"${name}",product_category:"${category}",product_description:" ${description}",product_price:" ${price}"}`
router.push("/qr-generator");
};

const fetchProducts = async () => {
  const { data: products, error } = await client.from("Products_2").select("*");
  setProducts.value = products as unknown as typeof setProducts.value;
};
const deleteProductCLient = (id: string) => {
  setProducts.value = setProducts.value.filter(
    (item) => item.product_id !== id
  );
};
onMounted(() => fetchProducts());
</script>

<style lang="scss" scoped></style>

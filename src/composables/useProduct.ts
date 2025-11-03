import { ref, watch, type Ref } from 'vue'
import { useFetch } from '@vueuse/core'
import type { Product } from '@/types/product'

export function useProduct(id: Ref<number>) {
  const product = ref<Product | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  watch(
    id,
    async (newId) => {
      loading.value = true
      error.value = null
      product.value = null

      const { data, error: fetchError } = await useFetch(
        `https://fakestoreapi.com/products/${newId}`
      ).json<Product>()

      if (fetchError.value) {
        error.value = fetchError.value
      }
      product.value = data.value

      loading.value = false
    },
    { immediate: true }
  )

  return { product, loading, error }
}

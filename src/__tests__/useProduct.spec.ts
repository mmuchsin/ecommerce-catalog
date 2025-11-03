import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref, nextTick } from 'vue'
import { useProduct } from '@/composables/useProduct'
import { useFetch } from '@vueuse/core'

const MOCK_PRODUCT_1 = {
    id: 1,
    title: 'Test Product',
    price: 100,
    description: 'A test item',
    category: "men's clothing",
    image: 'test.jpg',
    rating: { rate: 4.5, count: 10 }
}

const MOCK_PRODUCT_2 = {
  id: 2,
  title: 'Test Product 2',
  price: 200,
  description: 'A second test item',
  category: "women's clothing",
  image: 'test2.jpg',
  rating: { rate: 3.0, count: 5 }
}

vi.mock('@vueuse/core', () => ({
  useFetch: vi.fn()
}))

const mockedUseFetch = vi.mocked(useFetch)

describe('useProduct', () => {

  beforeEach(() => {
    // This clears all history (like "how many times was it called?")
    vi.clearAllMocks()

    // We set up a *default* successful mock for our tests
    mockedUseFetch.mockReturnValue({
      json: vi.fn().mockReturnValue({
        data: ref(MOCK_PRODUCT_1), // Default to returning Product 1
        error: ref(null)
      })
    } as any) // We use 'as any' to simplify the mock's complex type
  })

  // Test #1: (This test will now use the mock from beforeEach)
  it('fetches data successfully and updates state', async () => {
    // 1. ARRANGE
    const productId = ref(1)

    // 2. ACT
    const { product, loading, error } = useProduct(productId)
    await nextTick()

    // 3. ASSERT
    expect(loading.value).toBe(false)
    expect(error.value).toBe(null)
    expect(product.value).toEqual(MOCK_PRODUCT_1) // It gets Product 1
  })

  // Test #2: Re-fetches when id changes
  it('re-fetches when the id ref changes', async () => {
    // 1. ARRANGE (Initial call)
    const productId = ref(1)
    const { product, loading } = useProduct(productId)

    // 2. ACT (Wait for first fetch)
    await nextTick()

    // 3. ASSERT (Check first fetch)
    expect(product.value).toEqual(MOCK_PRODUCT_1)
    // We can also check *how many times* our mock was called
    expect(mockedUseFetch).toHaveBeenCalledTimes(1) 

    // --- Now we test the re-fetch ---

    // 4. ARRANGE (Change the mock's *next* return value)
    mockedUseFetch.mockReturnValue({
      json: vi.fn().mockReturnValue({
        data: ref(MOCK_PRODUCT_2), // Now it will return Product 2
        error: ref(null)
      })
    } as any)

    // 5. ACT (Trigger the watch by changing the id)
    productId.value = 2 // This is the key line!
    await nextTick()    // Wait for the watch effect to run

    // 6. ASSERT (Check the new state)
    expect(loading.value).toBe(false) // Still false (it finished)
    expect(product.value).toEqual(MOCK_PRODUCT_2) // Product has updated!
    expect(mockedUseFetch).toHaveBeenCalledTimes(2) // It was called again
  })

  // Test #3: Handles fetch error
  it('handles a fetch error correctly', async () => {
    // 1. ARRANGE (Set up the mock to return an error)
    mockedUseFetch.mockReturnValue({
      json: vi.fn().mockReturnValue({
        data: ref(null), // No data
        error: ref('Not Found') // An error message
      })
    } as any)

    const productId = ref(1)

    // 2. ACT
    const { product, loading, error } = useProduct(productId)
    await nextTick() // Wait for the fetch to "fail"

    // 3. ASSERT
    expect(loading.value).toBe(false) // Loading is finished
    expect(product.value).toBe(null)  // Product is null
    expect(error.value).toBeTypeOf('string') // error is a string
    expect(error.value).toBe('Not Found') // We can even check the message
  })

  // Test #4: Shows loading state properly
  it('shows loading state immediately on call', () => {
    // 1. ARRANGE
    const productId = ref(1)

    // 2. ACT
    const { product, loading, error } = useProduct(productId)

    // 3. ASSERT (Synchronous check)
    expect(loading.value).toBe(true)
    expect(product.value).toBe(null)
    expect(error.value).toBe(null)
  })
})
import { describe, it, expect, vi, beforeEach, type MockedFunction } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import ProductView from '@/views/ProductView.vue'
import ProductDisplay from '@/components/ProductDisplay.vue'
import ProductUnavailable from '@/components/ProductUnavailable.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import type { Product } from '@/types/product'

// --- Mock Data ---
const MOCK_PRODUCT_MEN: Product = {
  id: 1,
  title: 'Test Men Item',
  price: 100,
  description: 'A test item',
  category: "men's clothing",
  image: 'test.jpg',
  rating: { rate: 4.0, count: 10 }
}

const MOCK_PRODUCT_WOMEN: Product = {
    id: 2,
    title: 'Test Women Item',
    price: 150,
    description: 'A women test item',
    category: "women's clothing",
    image: 'test2.jpg',
    rating: { rate: 4.5, count: 8 }
}

const MOCK_PRODUCT_OTHER: Product = {
  id: 5,
  title: 'Test Jewelery Item',
  price: 50,
  description: 'A test item',
  category: "jewelery", // Non-matching category
  image: 'test.jpg',
  rating: { rate: 4.0, count: 10 }
}

// 1. Mock the module with a self-contained factory.
// This block is hoisted.
vi.mock('@/composables/useProduct', () => {
    // Create the mock *inside* the factory.
    // It doesn't reference any outside variables.
    return {
        useProduct: vi.fn(),
    }
})

// 2. NOW, import the composable *after* the mock.
// This 'useProduct' variable IS the vi.fn() we created inside the factory.
import { useProduct } from '@/composables/useProduct'
// 3. Assign the imported mock to a new variable (and cast it for TypeScript).
// This 'mockUseProduct' is what all your tests will use.
const mockUseProduct = useProduct as MockedFunction<typeof useProduct>

describe('ProductView.vue - Integration Tests', () => {
    
    // We mock the child components for shallow mounting.
    const globalMocks = {
        global: {
            stubs: {
                ProductDisplay,
                ProductUnavailable,
                LoadingSpinner,
            }
        }
    }

    beforeEach(() => {
        vi.clearAllMocks()

        // Default mock: Success state with an AVAILABLE product (Men's is a safe default)
        mockUseProduct.mockReturnValue({
            product: ref(MOCK_PRODUCT_MEN),
            loading: ref(false),
            error: ref(null),
        })
    })

    // SCENARIO 1: Shows spinner while loading
    it('renders LoadingSpinner when the composable indicates loading', () => {
        // ARRANGE: Override the mock for this specific test
        mockUseProduct.mockReturnValue({
            product: ref(null),
            loading: ref(true), // TRUE
            error: ref(null),
        })

        // ACT
        const wrapper = mount(ProductView, globalMocks)

        // ASSERT: Checks the v-if="loading" branch
        expect(wrapper.findComponent(LoadingSpinner).exists()).toBe(true)
        expect(wrapper.findComponent(ProductDisplay).exists()).toBe(false)
        expect(wrapper.findComponent(ProductUnavailable).exists()).toBe(false)
    })

    // SCENARIO 2: Displays product after load (Happy Path - Men and Women)
    it('renders ProductDisplay for all available product categories (men and women)', () => {
        // --- Test 2A: Men's Clothing (Default) ---
        // ARRANGE is handled by beforeEach (Success state with MOCK_PRODUCT_MEN)
        let wrapper = mount(ProductView, globalMocks)
        
        // ASSERT 2A
        expect(wrapper.findComponent(ProductDisplay).exists()).toBe(true)
        wrapper.unmount()

        // --- Test 2B: Women's Clothing ---
        mockUseProduct.mockReturnValue({
            product: ref(MOCK_PRODUCT_WOMEN),
            loading: ref(false),
            error: ref(null),
        })
        wrapper = mount(ProductView, globalMocks)
        
        // ASSERT 2B
        expect(wrapper.findComponent(ProductDisplay).exists()).toBe(true)
        expect(wrapper.findComponent(ProductUnavailable).exists()).toBe(false)
    })

    // SCENARIO 3: Handles unavailable category or fetch error
    it('renders ProductUnavailable when category does not match OR on fetch error', () => {
        // --- Test 3A: Unavailable Category (Tests isProductAvailable helper returning false) ---
        mockUseProduct.mockReturnValue({
            product: ref(MOCK_PRODUCT_OTHER), // Category: 'jewelery'
            loading: ref(false),
            error: ref(null),
        })
        let wrapper = mount(ProductView, globalMocks)
        
        // ASSERT 3A: Should render ProductUnavailable
        expect(wrapper.findComponent(ProductUnavailable).exists()).toBe(true)
        wrapper.unmount() // Clean up wrapper

        // --- Test 3B: Fetch Error (Tests the final v-else branch implicitly) ---
        mockUseProduct.mockReturnValue({
            product: ref(null), // Null product
            loading: ref(false),
            error: ref('Network Error'), // Error state
        })
        wrapper = mount(ProductView, globalMocks)
        
        // ASSERT 3B: Should also render ProductUnavailable
        expect(wrapper.findComponent(ProductUnavailable).exists()).toBe(true)
    })
})

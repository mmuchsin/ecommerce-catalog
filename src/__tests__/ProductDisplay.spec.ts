// src/__tests__/ProductDisplay.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductDisplay from '@/components/ProductDisplay.vue'
import type { Product } from '@/types/product'

// 1. MOCK DATA SETUP
const MOCK_MEN_PRODUCT: Product = {
  id: 1,
  title: 'Men’s Casual Slim Fit Shirt',
  price: 109.95,
  description: 'Your perfect pack for everyday use...',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/shirt.jpg',
  rating: { rate: 3.9, count: 120 }
}

const MOCK_WOMEN_PRODUCT: Product = {
  id: 2,
  title: 'Women’s Luxury Scarf',
  price: 55.00,
  description: 'A beautiful scarf for formal wear.',
  category: "women's clothing",
  image: 'https://fakestoreapi.com/img/scarf.jpg',
  rating: { rate: 4.8, count: 50 }
}

const MOCK_INCOMPLETE_PRODUCT: Product = {
  id: 3,
  title: 'Incomplete Data Item',
  price: 5.00,
  // description is intentionally missing
  description: '',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/null.jpg',
  // rating is intentionally null
  rating: null as any // Simulate null data from API response
}


describe('ProductDisplay.vue', () => {

  // SCENARIO 1: Renders product info, image, and initial rating
  it('renders all product info, image attributes, and price correctly', () => {
    // ARRANGE
    const wrapper = mount(ProductDisplay, {
      props: {
        product: MOCK_MEN_PRODUCT
      }
    })

    // ASSERT Text Content
    expect(wrapper.find('.title').text()).toBe(MOCK_MEN_PRODUCT.title)
    expect(wrapper.find('.price').text()).toBe(`$${MOCK_MEN_PRODUCT.price}`)
    expect(wrapper.find('.category').text()).toBe(MOCK_MEN_PRODUCT.category)
    
    // ASSERT Image Attributes
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(MOCK_MEN_PRODUCT.image)
    expect(img.attributes('alt')).toBe(MOCK_MEN_PRODUCT.title)

    // ASSERT Initial Rating Display
    expect(wrapper.find('.rating-text').text()).toBe(`${MOCK_MEN_PRODUCT.rating.rate}/5`)
  })

  // SCENARIO 2: Theme Class Logic
  it('applies the correct theme class based on product category', () => {
    
    // Test: Men's Clothing (should have theme-men or no class)
    const menWrapper = mount(ProductDisplay, { props: { product: MOCK_MEN_PRODUCT } })
    // We check for theme-men, which is the default, but we ensure theme-women is NOT present
    expect(menWrapper.find('.product-card').classes()).toContain('theme-men')
    expect(menWrapper.find('.product-card').classes()).not.toContain('theme-women')

    // Test: Women's Clothing (should have theme-women)
    const womenWrapper = mount(ProductDisplay, { props: { product: MOCK_WOMEN_PRODUCT } })
    expect(womenWrapper.find('.product-card').classes()).toContain('theme-women')
    expect(womenWrapper.find('.product-card').classes()).not.toContain('theme-men')
  })
  
  // SCENARIO 3: Handles missing/null data gracefully
  it('does not render the rating section when rating data is null', () => {
    // ARRANGE
    const wrapper = mount(ProductDisplay, {
      props: {
        product: MOCK_INCOMPLETE_PRODUCT
      }
    })

    // ACT & ASSERT: The component should NOT crash.
    // 1. Check that critical visible data is still present.
    expect(wrapper.find('.title').text()).toBe(MOCK_INCOMPLETE_PRODUCT.title)
    
    // 2. Check that the *buggy* section is now correctly suppressed.
    // If the component has the v-if fix, this element will not exist.
    expect(wrapper.find('.rating').exists()).toBe(false) 
  })
  
  // SCENARIO 4: Emitting 'next-product' event
  it('emits the "next-product" event when the Next Product button is clicked', async () => {
    // ARRANGE
    const wrapper = mount(ProductDisplay, { props: { product: MOCK_MEN_PRODUCT } })
    
    // ACT
    const nextButton = wrapper.find('.next-button')
    await nextButton.trigger('click')
    
    // ASSERT
    // Check that the custom event 'next-product' was emitted exactly once
    expect(wrapper.emitted('next-product')).toBeTruthy()
    expect(wrapper.emitted('next-product')?.length).toBe(1)
  })

})
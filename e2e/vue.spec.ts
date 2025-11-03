import { test, expect } from '@playwright/test';

// --- MOCK DATA ---
// Mock success data (Product ID 1 - Men's)
const MOCK_PRODUCT_1 = {
    id: 1,
    title: 'Mens Casual Slim Fit',
    price: 22.3,
    description: 'Your perfect pack for everyday use.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 3.9, count: 120 }
};

// Mock the next product (Product ID 2 - Women's)
const MOCK_PRODUCT_2 = {
    id: 2,
    title: 'Womens Designer Scarf',
    price: 45.99,
    description: 'A scarf for the cold winter months.',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/scarf.jpg',
    rating: { rate: 4.5, count: 50 }
};

// Mock unavailable product (Product ID 3 - Error/Unavailable)
const MOCK_PRODUCT_3 = {
    id: 3,
    title: 'Unavailable Item',
    price: 10,
    description: 'This is not available.',
    category: "electronics", // Triggers ProductUnavailable UI
    image: 'test.jpg',
    rating: { rate: 1.0, count: 10 }
};

test.describe('Product Explorer E2E Flow', () => {

    // --- Helper function to mock the API response ---
    async function mockApiCall(page, url, responseBody, status = 200) {
        await page.route(url, route => {
            route.fulfill({
                status: status,
                contentType: 'application/json',
                body: JSON.stringify(responseBody),
            });
        });
    }

    // SCENARIO 1: 🚀 Initial Load Works (Success Path)
    test('loads a product successfully and displays correct theme', async ({ page }) => {
        // ARRANGE: Mock the initial API call (ID 1)
        await mockApiCall(page, '**/products/1', MOCK_PRODUCT_1);

        // ACT: Navigate to the app (triggers initial fetch)
        await page.goto('/');

        // ASSERT 1: Spinner (Checks loading state, usually too fast for Playwright, but good to check briefly)
        // We'll primarily focus on the final state.
        
        // ASSERT 2: Product Card is visible
        const productTitle = page.getByRole('heading', { name: MOCK_PRODUCT_1.title });
        await expect(productTitle).toBeVisible();

        // ASSERT 3: Correct Data & Theme Color (Men's - Dark Blue)
        const buyButton = page.getByRole('button', { name: 'Buy now' });
        await expect(buyButton).toBeVisible();
        await expect(buyButton).toHaveCSS('background-color', 'rgb(0, 39, 114)'); // --color-blue-dark
        
        // ASSERT 4: Background Color (Men's - Light Blue)
        const pageBody = page.locator('body');
        // Check the background gradient's top color
        await expect(pageBody).toHaveCSS('background', /rgb\(214, 230, 255\)/); // --color-blue-light
    });


    // SCENARIO 2: 🔁 Next Product Works (Navigation Flow)
    test('navigates through products, changing categories and themes', async ({ page }) => {
        // ARRANGE 1: Mock initial product (ID 1)
        await mockApiCall(page, '**/products/1', MOCK_PRODUCT_1);
        
        // ARRANGE 2: Mock the NEXT product (ID 2)
        await mockApiCall(page, '**/products/2', MOCK_PRODUCT_2);

        // ACT 1: Navigate to the app
        await page.goto('/');
        
        // Wait for product 1 to load
        await expect(page.getByRole('heading', { name: MOCK_PRODUCT_1.title })).toBeVisible();

        // ACT 2: Click the Next button (Triggers fetch for ID 2)
        const nextButton = page.getByRole('button', { name: 'Next product' });
        await nextButton.click();

        // ASSERT 1: New Product is Visible
        await expect(page.getByRole('heading', { name: MOCK_PRODUCT_2.title })).toBeVisible();
        
        // ASSERT 2: Theme Change (Women's - Dark Magenta)
        const buyButton = page.getByRole('button', { name: 'Buy now' });
        await expect(buyButton).toHaveCSS('background-color', 'rgb(114, 0, 96)'); // --color-magenta-dark
        
        // ASSERT 3: Background Color Change (Women's - Light Pink)
        const pageBody = page.locator('body');
        // Check the background gradient's top color has changed
        await expect(pageBody).toHaveCSS('background', /rgb\(253, 226, 255\)/); // --color-pink-light
    });

    // SCENARIO 3: ❌ Error / Unavailable Recovery
    test('shows unavailable screen for non-matching products and allows recovery', async ({ page }) => {
        // ARRANGE 1: Mock initial product (ID 1)
        await mockApiCall(page, '**/products/1', MOCK_PRODUCT_1); 
        
        // ARRANGE 2: Mock the NEXT product (ID 2) to be UNAVAILABLE
        await mockApiCall(page, '**/products/2', MOCK_PRODUCT_3); // Category: 'electronics'
        
        // ARRANGE 3: Mock the product AFTER the error (ID 3) to be a SUCCESS
        await mockApiCall(page, '**/products/3', MOCK_PRODUCT_2); // Return a valid product

        // ACT 1: Load page and click Next (to get the unavailable product)
        await page.goto('/');
        await page.getByRole('button', { name: 'Next product' }).click();

        // ASSERT 1: Unavailable Screen is Visible
        await expect(page.getByText('This product is unavailable to show')).toBeVisible();

        // ASSERT 2: Theme Change (Unavailable - Light Grey)
        const pageBody = page.locator('body');
        // Check the background gradient's top color is the neutral grey
        await expect(pageBody).toHaveCSS('background', /rgb\(240, 242, 245\)/); // #F0F2F5

        // ACT 2: Click Next on the Unavailable screen (Triggers fetch for ID 3)
        await page.getByRole('button', { name: 'Next product' }).click();

        // ASSERT 3: Recovery is successful (New successful product loads)
        await expect(page.getByRole('heading', { name: MOCK_PRODUCT_2.title })).toBeVisible();
        await expect(page.getByText('This product is unavailable to show')).not.toBeVisible();
        
        // ASSERT 4: Theme is restored (Women's Light Pink/Magenta)
        await expect(pageBody).toHaveCSS('background', /rgb\(253, 226, 255\)/); // --color-pink-light
    });

});
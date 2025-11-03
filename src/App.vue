<script setup lang="ts">
import ProductView from '@/views/ProductView.vue';
</script>

<template>
  <ProductView />
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

/* In App.vue <style> */

/* 1. Base Color Palette
   We define all our colors from the Figma file first.
*/
:root {
  --color-blue-dark: #002772;
  --color-blue-light: #D6E6FF;
  --color-magenta-dark: #720060;
  --color-pink-light: #FDE2FF;
  --color-black: #1E1E1E;
  --color-grey-dark: #3F3F3F;
  --color-grey-light: #DCDCDC;
  --color-white: #FFFFFF;

  --font-family-main: 'Manrope', sans-serif;
}

/* 2. Semantic Roles (Defaulting to "Men's" theme)
   These are the variables your components will *actually* use.
*/
:root {
  --theme-color-primary: var(--color-blue-dark);
  --theme-color-secondary-border: var(--color-blue-dark);
  --theme-color-bg: var(--color-blue-light);
  --theme-color-text-on-primary: var(--color-white);

  /* Neutral roles that don't change with the theme */
  --text-main: var(--color-black);
  --text-secondary: var(--color-grey-dark);
  --border-main: var(--color-grey-light);
  --bg-card: var(--color-white);
}

/* 3. Theme Overrides
   We define classes that will override the semantic roles.
*/

/* This class will be applied for the Women's theme */
.theme-women {
  --theme-color-primary: var(--color-magenta-dark);
  --theme-color-secondary-border: var(--color-magenta-dark);
  --theme-color-bg: var(--color-pink-light);
}

/* This class will be applied for the Unavailable theme */
.theme-unavailable {
  /* The "unavailable" page has a neutral light-grey background */
  --theme-color-bg: #F0F2F5;
  /* A slightly off-white grey */
}

/* 4. Global Body Styles
   Apply the base background color to the whole app.
*/

html,
body {
  height: 100%;
}

body {
  font-family: var(--font-family-main);
  color: var(--text-main);

  /* 2 Color Background
     * We use a hard-stop gradient to create a solid 70%/20% split.
    */
  background: linear-gradient(to bottom,
      var(--theme-color-bg) 70%,
      /* The top 70% is the dynamic theme color */
      var(--color-white) 70%
      /* The bottom 20% is solid white */
    );

  /* Fallback for older browsers (will just be one color) */
  background-color: var(--theme-color-bg);

  /* Make sure the body itself fills the screen */
  min-height: 100vh;

  /* Update transition to target 'background' instead of 'background-color' */
  transition: background 0.3s ease;
}
</style>

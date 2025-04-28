<template>
  <router-view />
</template>

<style>
#app {
  font-family: 'Kanit', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

div {
  scrollbar-width: none;
  -ms-overflow-style: none;
  scrollbar-color: transparent transparent;
}

div::-webkit-scrollbar {
  width: 0;
  height: 0;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

@media screen and (max-width: 1279) {
  body {
    overflow: hidden;
  }
}
</style>

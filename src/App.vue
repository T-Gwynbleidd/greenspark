<template>
  <main class='container'>
    <h1 class='title'>Per product widgets</h1>
    <hr class='line-break'>
    <section class='widget-container'>
      <ProductWidget
        v-for="(product) in store.state.products.allProducts"
        :key='product.id'
        :id='product.id'
        :type='product.type'
        :amount='product.amount'
        :action='product.action'
        :linked='product.linked'
        :active='product.active'
        :selected-color='product.selectedColor'
        />
    </section>
  </main>
</template>

<script setup lang="ts">
import { useStore } from './store'
import ProductWidget from './components/ProductWidget.vue';

const store = useStore();
store.dispatch('products/getAllProducts');
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

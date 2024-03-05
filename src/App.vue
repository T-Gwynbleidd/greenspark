<template>
  <section class='container'>
    <header>
      <h1 class='title'>Per product widgets</h1>
      <hr class='line-break'>
    </header>
    <main class='widget-container'>
      <LoadingSpinner v-if="isLoading"/>
      <ProductWidget v-else
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
    </main>
  </section>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import { useStore } from './store'
import ProductWidget from './components/ProductWidget.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';

const store = useStore();
const props = defineProps<{
  loadDuration?: number
}>()

const isLoading = ref(true);
store.dispatch('products/getAllProducts');

onMounted(() => {
  if (props.loadDuration !== undefined && props.loadDuration > 0) {
    setTimeout(() => {
      isLoading.value = false;
    }, props.loadDuration);
  } else {
    isLoading.value = false;
  }
});

// TODO https://vuejs.org/guide/built-ins/transition.html#transition, transition loader, and loading of product widgets
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

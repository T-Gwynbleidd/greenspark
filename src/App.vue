<template>
  <section class='container'>
    <header>
      <h1 class='title cabin-bold'>Per product widgets</h1>
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
@import '@/styles/colors.scss';

body {
  margin: 0;
}

#app {
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding: 60px 60px 100px;
  min-height: calc(100vh - 160px);
  font-family: "Cabin", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  margin-left: auto;
  margin-right: auto;
  padding: 36px;
  width: 100%;
  max-width: 851px;
  min-height: 419px;
  background-color: $off-white;
  border-radius: 8px;
  box-shadow: 0px 42px 76px 0px #00000026;
}

.title {
  margin: 0;
  padding-bottom: 12px;
  font-size: 30px;
  line-height: 36px;
  color: $black;
}

.line-break {
  margin-bottom: 18px;
  height: 2px;
  background-color: $border;
  border: none;
}

.widget-container {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 38px;
}
</style>

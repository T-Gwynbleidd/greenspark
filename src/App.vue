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
@import '@/styles/core/colors.scss';
@import '@/styles/tools/media-queries/above';

body {
  margin: 0;
}

#app {
  display: flex;
  flex-flow: column;
  padding: 48px 22px;
  min-height: calc(100vh - 96px);
  font-family: "Cabin", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @include above('tablet-portrait') {
    justify-content: center;
  }

  @include above('tablet-medium') {
    padding: 60px 60px 100px;
    min-height: calc(100vh - 160px);
  }
}

.container {
  margin-left: auto;
  margin-right: auto;
  padding: 36px;
  width: 100%;
  max-width: calc(100vw - 116px);
  background-color: $off-white;
  border-radius: 8px;
  box-shadow: 0px 42px 76px 0px #00000026;
  overflow: hidden;

  @include above('tablet-portrait') {
    min-height: 419px;
  }

  @include above('tablet-medium') {
    max-width: calc(100vw - 182px);
  }

  @include above('tablet-landscape') {
    max-width: 851px;
  }
}

.title {
  margin: 0;
  padding-bottom: 12px;
  font-size: 30px;
  line-height: 36px;
  color: $black;
  text-align: center;

  @include above('tablet-portrait') {
    text-align: left;
  }
}

.line-break {
  margin-top: 0;
  margin-bottom: 18px;
  height: 2px;
  background-color: $border;
  border: none;
}

.widget-container {
  display: grid;
  grid-template-rows: auto;
  gap: 38px;
  padding: 0 20px;

  @include above('tablet-portrait') {
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0;
  }
}
</style>

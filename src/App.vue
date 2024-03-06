<template>
<section class='container'>
  <header>
    <h1 class='title cabin-bold'>Per product widgets</h1>
    <hr class='line-break'>
  </header>
  <Transition name="fade" mode="out-in">
    <LoadingSpinner v-if="isLoading" />
    <main v-else class='widget-container'>
      <TransitionGroup
        appear
        :css="false"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
        >
        <ProductWidget 
          v-for="(product, index) in store.state.products.allProducts"
          :key='product.id'
          :id='product.id'
          :type='product.type'
          :amount='product.amount'
          :action='product.action'
          :linked='product.linked'
          :active='product.active'
          :selected-color='product.selectedColor'
          :data-index="index"
          />
      </TransitionGroup>
    </main>
  </Transition>
</section>
</template>

<script setup lang="ts">
import {
  defineProps,
  onMounted,
  ref
} from 'vue'
import { useStore } from './store'
import { gsap } from 'gsap'
import ProductWidget from './components/ProductWidget.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';

const store = useStore();
const props = defineProps < {
  loadDuration ?: number
} > ()

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
// eslint-disable-next-line
function onBeforeEnter(el: any) {
  el.style.opacity = '0';
  el.style.height = '0';
}
// eslint-disable-next-line
function onEnter(el: any, done: () => void) {
  gsap.to(el, {
    opacity: 1,
    height: 'auto',
    delay: (el.dataset.index ? el.dataset.index : 1) * 0.25,
    onComplete: done
  })
}
// eslint-disable-next-line
function onLeave(el: any, done: () => void) {
  gsap.to(el, {
    opacity: 0,
    height: 0,
    delay: (el.dataset.index ? el.dataset.index : 1) * 0.25,
    onComplete: done
  })
}
</script>

<style lang="scss">
@import '@/styles/core/colors.scss';
@import '@/styles/tools/media-queries/above';
@import '@/styles/tools/media-queries/breakpoint';

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
  overflow: hidden;

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

  @include breakpoint(550px) {
    grid-template-columns: 1fr 1fr;
    padding: 0;
  }

  @include above('tablet-portrait') {
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

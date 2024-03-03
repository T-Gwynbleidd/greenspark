<template>
  <main class='container'>
    <h1 class='title'>Per product widgets</h1>
    <hr class='line-break'>
    <section class='widget-container'>
      <ProductWidget
        :id=1
        type='carbon'
        :amount=100
        action='offsets'
        v-model:linked='linked'
        v-model:active='active'
        v-model:selected-color='selectedColor'
        />
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { SelectedColorType } from '@/types';
import ProductWidget from './components/ProductWidget.vue';

const linked = ref(false);
const active = ref(true);
const selectedColor: Ref<SelectedColorType> = ref('blue');
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

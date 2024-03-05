<template>
  <div class='spinner'>
    <img v-svg-inline class="icon logo" src="../assets/greenspark-logo.svg" alt="greenspark logo" />
  </div>
</template>

<script setup lang="ts">
import VueSvgInlinePlugin from 'vue-svg-inline-plugin';
const vSvgInline = VueSvgInlinePlugin;

// TODO style loader
</script>

<style scoped lang="scss">
.spinner {
  $block: &;

  .logo {
    animation: rotation 10s infinite linear;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
}
</style>

<template>
  <div class='spinner'>
    <SvgGreensparkLogo />
  </div>
</template>

<script setup lang="ts">
import SvgGreensparkLogo from './SvgGreensparkLogo.vue';
</script>

<style scoped lang="scss">
@import '@/styles/core/colors.scss';

.spinner {
  $block: &;
  display: flex;
  justify-content: center;
  grid-column: span 3;
  margin-top: 50px;
  color: $green;

  .logo {
    height: 50px;
    width: 50px;
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

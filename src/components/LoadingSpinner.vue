<template>
<div class='spinner'>
  <SvgGreensparkLogo />
</div>
</template>

<script setup lang="ts">
import SvgGreensparkLogo from './SvgGreensparkLogo.vue';
</script>

<style lang="scss" scoped>
@import '@/styles/core/colors.scss';

.spinner {
  $block: &;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
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

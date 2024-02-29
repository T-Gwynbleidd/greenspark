<template>
  <button class="TDDButton" :class="type" @click="$emit('click')">{{ label }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TDDButton',
  props: {
    label: String,
    type: String,
  },
});
</script>

<style scoped lang="scss">
.TDDButton {
  all: unset;
  font-family: sans-serif;
  padding: .5rem 1rem;
  border-radius: .25rem;
  cursor: pointer;
  background: lightgray;
}

.primary {
  background: deeppink;
  color: white;
}
</style>
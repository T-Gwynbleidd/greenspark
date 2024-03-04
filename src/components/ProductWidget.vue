<template>
  <aside class='productWidget'>
    <header class='productWidget__header' :class='`productWidget__header--${selectedColor ? selectedColor : "white"}`'>
      <img v-svg-inline class="icon logo" src="../assets/greenspark.svg" alt="greenspark logo" />
      <h3 class='productWidget__title'>This product {{ action }}<span>{{ amount }}{{ type === 'carbon' ? `kgs of ${type}`: ` ${type}` }}</span></h3>
    </header>

    <div class='productWidget__contents'>
      <div class='productWidget__inputRow'>
        <input type="checkbox" :id="`linked-${id}`" name="linked" value="linked" class='productWidget__input' v-model='computedLinked'>
        <label :for="`linked-${id}`" class='productWidget__label'>Link to Public Profile</label>
        <div class='productWidget__tooltip'>
          <img v-svg-inline class="icon tooltip" src="../assets/tooltip.svg" alt="tooltip icon" />
          <div class='productWidget__tooltipDetails'>
            <p>This widget links directly to your public profile so that you can easily share your impact with your customers. Turn it off here if you do not want the badge to link to it.</p>
            <a href='#'>View Public Profile</a>
          </div>
        </div>
      </div>
      
      <div class='productWidget__inputRow'>
        <label :for="`badge_colour-${id}`">Badge colour</label>
        <input type="radio" :id="`blue-${id}`" :name="`badge_colour-${id}`" :value='"blue"' aria-label='blue badge colour' v-model="computedColor">
        <input type="radio" :id="`green-${id}`" :name="`badge_colour-${id}`" :value='"green"' aria-label='green badge colour' v-model="computedColor">
        <input type="radio" :id="`beige-${id}`" :name="`badge_colour-${id}`" :value='"beige"' aria-label='beige badge colour' v-model="computedColor">
        <input type="radio" :id="`white-${id}`" :name="`badge_colour-${id}`" :value='"white"' aria-label='white badge colour' v-model="computedColor">
        <input type="radio" :id="`black-${id}`" :name="`badge_colour-${id}`" :value='"black"' aria-label='black badge colour' v-model="computedColor">
      </div>
      <div class='productWidget__inputRow'>
        <input type="checkbox" :id="`active-${id}`" name="active" value="active" class='productWidget__input' v-model='computedActive'>
        <label :for="`active-${id}`" class='productWidget__label'>Activate Badge</label>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { ProductWidgetProps, SelectedColorType } from '@/types';
import { useStore } from '@/store'

const store = useStore();
const props = defineProps<ProductWidgetProps>();
const computedLinked = computed({
  get() {
    return props.linked;
  },
  set(newValue) {
    store.dispatch('products/amendProduct', {id: props.id, linked: newValue});
  }
});
const computedColor = computed({
  get() {
    if (props.selectedColor !== undefined) {
      return props.selectedColor;
    } else {
      return 'white';
    }
  },
  set(newValue: SelectedColorType) {
    store.dispatch('products/amendProduct', {id: props.id, selectedColor: newValue});
  }
});
const computedActive = computed({
  get() {
    return props.active;
  },
  set(newValue) {
    if (newValue === true) {
      store.dispatch('products/changeActiveProduct', {id: props.id, active: newValue});
    } else {
      store.dispatch('products/amendProduct', {id: props.id, active: newValue});
    }
  }
});

// TODO, style widget
// TODO, query what should public profile link to
// --- is there a default color, or can it be blank?
// TODO, vuex & test top level
// Please include a README describing what you’ve done and why, and how to run and use the service.
</script>

<style scoped lang="scss">
.productWidget {
  $block: &;

  &__header {
    &--white {}
    &--black {}
    &--blue {}
    &--green {}
    &--beige {}
    // TODO, if above class is ...
    #{ $block }--reversed & {
      background: rebeccapurple;
    }
  }

  &__tooltip {
    .icon.tooltip {
      &:hover, &:focus {
        ~ #{ $block }__tooltipDetails {
          visibility: visible;
          opacity: 1;
          transition: .25s all ease;
          transition-delay: 0s;
        }
      }
    }

    #{ $block }__tooltipDetails {
      visibility: hidden;
      opacity: 0;
      transition: .25s all ease;
      transition-delay: .25s;

      &:hover, &:focus {
        visibility: visible;
        opacity: 1;
      }
    }
  }
}
</style>

<template>
  <aside class='productWidget'>
    <header class='productWidget__header' :class='`productWidget__header--${selectedColor ? selectedColor : "white"}`'>
      <img v-svg-inline class="icon logo" src="../assets/greenspark.svg" alt="greenspark logo" />
      <h3 class='productWidget__title'>This product {{ action }}<span>{{ amount }}{{ type === 'carbon' ? `kgs of ${type}`: ` ${type}` }}</span></h3>
    </header>

    <div class='productWidget__contents'>
      <div class='productWidget__inputRow'>
        <input type="checkbox" id="linked" name="linked" value="linked" class='productWidget__input' v-model='linked'>
        <label for="linked" class='productWidget__label'>Link to Public Profile</label>
        <div class='productWidget__tooltip'>
          <img v-svg-inline class="icon tooltip" src="../assets/tooltip.svg" alt="tooltip icon" />
          <div class='productWidget__tooltipDetails'>
            <p>This widget links directly to your public profile so that you can easily share your impact with your customers. Turn it off here if you do not want the badge to link to it.</p>
            <a href='#'>View Public Profile</a>
          </div>
        </div>
      </div>
      
      <div class='productWidget__inputRow'>
        <label for='badge_colour'>Badge colour</label>
        <input type="radio" id="blue" name="badge_colour" value="blue" aria-label='blue badge colour' v-model="selectedColor">
        <input type="radio" id="green" name="badge_colour" value="green" aria-label='green badge colour' v-model="selectedColor">
        <input type="radio" id="beige" name="badge_colour" value="beige" aria-label='beige badge colour' v-model="selectedColor">
        <input type="radio" id="white" name="badge_colour" value="white" aria-label='white badge colour' v-model="selectedColor">
        <input type="radio" id="black" name="badge_colour" value="black" aria-label='black badge colour' v-model="selectedColor">
      </div>
      
      <div class='productWidget__inputRow'>
        <input type="checkbox" id="active" name="active" value="active" class='productWidget__input' v-model='active'>
        <label for="active" class='productWidget__label'>Activate Badge</label>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { defineModel, defineProps } from 'vue';
import { ProductWidgetProps, SelectedColorType } from '@/types';

defineProps<ProductWidgetProps>();
const linked = defineModel<boolean>('linked');
const selectedColor = defineModel<SelectedColorType>('selectedColor');
const active = defineModel<boolean>('active');

// TODO, style widget
// TODO, query what should public profile link to
// --- is there a default color, or can it be blank?
// TODO, vuex & test top level
// --- (Only one widget can have the active state at a time)
// --- Initial values from https://api.mocki.io/v2/016d11e8/product-widgets
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

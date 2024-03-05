<template>
  <aside class='productWidget'>
    <header class='productWidget__header' :class='`productWidget__header--${selectedColor ? selectedColor : "white"}`'>
      <img v-svg-inline class="icon logo" src="../assets/greenspark.svg" alt="greenspark logo" />
      <h3 class='productWidget__title'>This product {{ action }}<span class='cabin-bold'>{{ amount }}{{ type === 'carbon' ? `kgs of ${type}`: ` ${type}` }}</span></h3>
    </header>

    <div class='productWidget__contents'>
      <div class='productWidget__inputContainer'>
        <div class='productWidget__inputCol productWidget__inputCol--right'>
          <input type="checkbox" :id="`linked-${id}`" name="linked" value="linked" class='productWidget__input' v-model='computedLinked'>
        </div>
        <div class='productWidget__inputCol productWidget__inputCol--left'>
          <label :for="`linked-${id}`" class='productWidget__label'>Link to Public Profile</label>
          <div class='productWidget__tooltip'>
            <img v-svg-inline class="icon tooltip" src="../assets/tooltip.svg" alt="tooltip icon" />
            <div class='productWidget__tooltipDetails'>
              <p>This widget links directly to your public profile so that you can easily share your impact with your customers. Turn it off here if you do not want the badge to link to it.</p>
              <a href='#'>View Public Profile</a>
            </div>
          </div>
        </div>
      </div>
      
      <div class='productWidget__inputContainer'>
        <div class='productWidget__inputCol productWidget__inputCol--left'>
          <label :for="`badge_colour-${id}`" class='productWidget__label'>Badge colour</label>
        </div>
        <div class='productWidget__inputCol productWidget__inputCol--right'>
          <input type="radio" :id="`blue-${id}`" :name="`badge_colour-${id}`" :value='"blue"' aria-label='blue badge colour' v-model="computedColor">
          <input type="radio" :id="`green-${id}`" :name="`badge_colour-${id}`" :value='"green"' aria-label='green badge colour' v-model="computedColor">
          <input type="radio" :id="`beige-${id}`" :name="`badge_colour-${id}`" :value='"beige"' aria-label='beige badge colour' v-model="computedColor">
          <input type="radio" :id="`white-${id}`" :name="`badge_colour-${id}`" :value='"white"' aria-label='white badge colour' v-model="computedColor">
          <input type="radio" :id="`black-${id}`" :name="`badge_colour-${id}`" :value='"black"' aria-label='black badge colour' v-model="computedColor">
        </div>
      </div>

      <div class='productWidget__inputContainer'>
        <div class='productWidget__inputCol productWidget__inputCol--right'>
          <input type="checkbox" :id="`active-${id}`" name="active" value="active" class='productWidget__input' v-model='computedActive'>
        </div>
        <div class='productWidget__inputCol productWidget__inputCol--left'>
          <label :for="`active-${id}`" class='productWidget__label'>Activate Badge</label>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
// import VueSvgInlinePlugin from 'vue-svg-inline-plugin';
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
// const vSvgInline = VueSvgInlinePlugin;

// TODO, style widget
// TODO, query what should public profile link to
// --- is there a default color, or can it be blank?
</script>

<style scoped lang="scss">
.productWidget {
  $block: &;

  &__header {
    padding: 10.3px 11.91px;
    margin-bottom: 10px;
    border-radius: 5.95px;
    color: #F9F9F9;
    display: flex;
    flex-flow: row;
    gap: 24px;

    // TODO, transition
    &--white {
      background-color: #FFFFFF;
      color: #3B755F;
    }
    &--black {
      background-color: #212121;
    }
    &--blue {
      background-color: #2E3A8C;
    }
    &--green {
      background-color: #3B755F;
    }
    &--beige {
      background-color: #F2EBDB;
      color: #3B755F;
    }
    // TODO, if above class is ...
    // #{ $block }--reversed & {
    //   background: rebeccapurple;
    // }

    .icon.logo {
      width: 39.7px;
      height: 45.51px;
      flex-shrink: 0;
    }
  }

  &__title {
    min-height: 21.59px;
    font-size: 12.41px;
    line-height: 15.07px;
    margin: 0;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    font-weight: 400;

    span {
      display: block;
      font-size: 17.86px;
      line-height: 21.71px;
    }
  }

  &__inputContainer {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
  }

  &__inputCol {
    display: flex;
    flex-flow: row;

    &--right {
      order: 1;
    }

    &--left {
      order: 0;
    }
  }

  &__label {
    font-size: 14px;
    line-height: 17.01px;
    color: #3B755F;
  }

  &__tooltip {
    position: relative;
    top: -3px;

    .icon.tooltip {
      color: #3B755F;
      height: 12px;
      width: 12px;

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
      position: absolute;
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

  &__contents {
    display: flex;
    flex-flow: column;
    gap: 10px;
  }
}
</style>

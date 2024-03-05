<template>
  <aside class='productWidget'>
    <header class='productWidget__header' :class='`productWidget__header--${selectedColor ? selectedColor : "white"}`'>
      <img v-svg-inline class="icon logo" src="../assets/greenspark.svg" alt="greenspark logo" />
      <h3 class='productWidget__title'>This product {{ action }}<span class='cabin-bold'>{{ amount }}{{ type === 'carbon' ? `kgs of ${type}`: ` ${type}` }}</span></h3>
    </header>

    <div class='productWidget__contents'>
      <div class='productWidget__inputRow'>
        <div class='productWidget__inputCol productWidget__inputCol--right'>
          <div class='productWidget__inputContainer'>
            <input type="checkbox" :id="`linked-${id}`" name="linked" value="linked" class='productWidget__input productWidget__input--checkbox' v-model='computedLinked'>
            <span class='checkbox'></span>
          </div>
        </div>
        <div class='productWidget__inputCol productWidget__inputCol--left'>
          <label :for="`linked-${id}`" class='productWidget__label'>Link to Public Profile</label>
          <div class='productWidget__tooltip'>
            <img v-svg-inline class="icon tooltip" src="../assets/tooltip.svg" alt="tooltip icon" />
            <div class='productWidget__tooltipDetails'>
              <p>This widget links directly to your public profile so that you can easily share your impact with your customers. Turn it off here if you do not want the badge to link to it.</p>
              <a href='#' class='cabin-bold'>View Public Profile</a>
            </div>
          </div>
        </div>
      </div>
      
      <div class='productWidget__inputRow'>
        <div class='productWidget__inputCol productWidget__inputCol--left'>
          <label :for="`badge_colour-${id}`" class='productWidget__label productWidget__label--no-point'>Badge colour</label>
        </div>
        <div class='productWidget__inputCol productWidget__inputCol--right'>
          <div class='productWidget__inputContainer'>
            <input type="radio" :id="`blue-${id}`" :name="`badge_colour-${id}`" :value='"blue"' aria-label='blue badge colour' class='productWidget__input productWidget__input--radio' v-model="computedColor">
            <span class='radio radio--blue'></span>
          </div>
            <div class='productWidget__inputContainer'>
            <input type="radio" :id="`green-${id}`" :name="`badge_colour-${id}`" :value='"green"' aria-label='green badge colour' class='productWidget__input productWidget__input--radio' v-model="computedColor">
            <span class='radio radio--green'></span>
          </div>
          <div class='productWidget__inputContainer'>
            <input type="radio" :id="`beige-${id}`" :name="`badge_colour-${id}`" :value='"beige"' aria-label='beige badge colour' class='productWidget__input productWidget__input--radio' v-model="computedColor">
            <span class='radio radio--beige'></span>
          </div>
          <div class='productWidget__inputContainer'>
            <input type="radio" :id="`white-${id}`" :name="`badge_colour-${id}`" :value='"white"' aria-label='white badge colour' class='productWidget__input productWidget__input--radio' v-model="computedColor">
            <span class='radio radio--white'></span>
          </div>
          <div class='productWidget__inputContainer'>
            <input type="radio" :id="`black-${id}`" :name="`badge_colour-${id}`" :value='"black"' aria-label='black badge colour' class='productWidget__input productWidget__input--radio' v-model="computedColor">
            <span class='radio radio--black'></span>
          </div>
        </div>
      </div>

      <div class='productWidget__inputRow'>
        <div class='productWidget__inputCol productWidget__inputCol--right'>
          <div class='productWidget__inputContainer'>
            <input type="checkbox" :id="`active-${id}`" name="active" value="active" class='productWidget__input productWidget__input--toggle' v-model='computedActive'>
            <div class='toggle-slider'>
              <span class='toggle'></span>
            </div>
          </div>
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
// TODO const vSvgInline = VueSvgInlinePlugin;
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
    transition: .25s all ease;
          
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

  &__contents {
    display: flex;
    flex-flow: column;
    gap: 10px;
  }

  &__inputRow {
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
      gap: 4px;
    }

    &--left {
      order: 0;
    }
  }

  &__inputContainer {
    position: relative;
  }

  &__input {
      position: absolute;
      opacity: 0;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      box-sizing: border-box;
      margin: 0;
      cursor: pointer;

    &--checkbox {
      &:hover + .checkbox:before {
        opacity: 0.5;
      }

      &:checked + .checkbox {
        background-color: #3B755F;
        border-color: #3B755F;

        &:before {
          opacity: 0;
        }

        &:after {
          opacity: 1;
        }
      }
    }

    &--radio {
      &:hover + .radio {
        opacity: 0.8;
      }

      &:checked + .radio {
        border: 1.5px solid #B0B0B0;
      }
    }

    &--toggle {
      &:hover + .toggle-slider .toggle {
        outline: 5.4px solid #AFC6BD80;
      }

      &:checked + .toggle-slider {
        background-color: #3B755F;

        .toggle {
          transform: translateX(20px);
        }
      }
    }
  }

  .checkbox {
    position: relative;
    display: block;
    height: 18px;
    width: 18px;
    border: 2px solid #212121;
    border-radius: 3px;
    box-sizing: border-box;
    cursor: pointer;

    &:before {
      content: "";
      position: absolute;
      background-color: #AFC6BD;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: .25s all ease;
      z-index: 1;
      height: 36px;
      width: 36px;
      border-radius: 100%;
      pointer-events: none;
    }

    &:after {
      content: "✓";
      color: white;
      position: absolute;
      opacity: 0;
      top: -5px;
      left: 1px;
      transition: .25s all ease;
    }
  }

  .radio {
    display: block;
    height: 16px;
    width: 16px;
    box-sizing: border-box;
    box-shadow: 0px 8.5px 8.5px 0px #00000003;
    cursor: pointer;
    transition: .25s all ease;

    &--blue {
      background-color: #2E3A8C;
    }

    &--green {
      background-color: #3B755F;
    }

    &--beige {
      background-color: #F2EBDB;;
    }

    &--white {
      background-color: #ffffff;
    }

    &--black {
      background-color: #212121;
    }
  }

  .toggle-slider {
    position: relative;
    display: block;
    height: 20.05px;
    width: 40.11px;
    border-radius: 34.18px;
    box-sizing: border-box;
    background: #F9F9F9;
    border: 0.59px solid #AFC6BD;
    box-shadow: 0px 0.884669303894043px 5.897795677185059px 0px #00000026 inset;
    cursor: pointer;
    transition: .4s;
  }

  .toggle {
    position: absolute;
    top: -1px;
    left: -1px;
    height: 21.05px;
    width: 21.05px;
    background: #F9F9F9;
    border: 0.59px solid #F2EBDB;
    box-shadow: 0px 0px 1.1795591115951538px 0px #00000059;
    border-radius: 29.49px;
    transition: .4s;
    box-sizing: border-box;
  }

  &__label {
    font-size: 14px;
    line-height: 17.01px;
    color: #3B755F;
    cursor: pointer;

    &--no-point {
      cursor: auto;
    }
  }

  &__tooltip {
    position: relative;
    top: -3px;

    .icon.tooltip {
      color: #3B755F;
      height: 12px;
      width: 12px;
      cursor: pointer;

      &:hover, &:focus {
        ~ #{ $block }__tooltipDetails {
          visibility: visible;
          opacity: 1;
          transition: .25s all ease;
          transition-delay: 0s;
          transform: translateX(-30%);
        }
      }
    }

    #{ $block }__tooltipDetails {
      position: absolute;
      visibility: hidden;
      opacity: 0;
      transition: .25s all ease;
      transition-delay: .25s;
      border-radius: 4px;
      padding: 24px 16px 24px 16px;
      width: 248px;
      background-color: #FFFFFF;
      z-index: 1;
      text-align: center;
      font-size: 14px;
      line-height: 17.01px;
      left: 50%;
      box-shadow: 0px 42px 76px 0px #00000026;


      &:hover, &:focus {
        visibility: visible;
        opacity: 1;
        transform: translateX(-30%);
      }

      p {
        margin: 0 0 12px;
      }

      a {
        letter-spacing: -2%;
        color: #3B755F;
        text-decoration: none;

        &:hover, &:focus {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>

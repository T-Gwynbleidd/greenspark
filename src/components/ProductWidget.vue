<template>
<aside class='productWidget'>
  <header class='productWidget__header' :class='`productWidget__header--${selectedColor ? selectedColor : "white"}`'>
    <SvgGreenspark />
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
          <SvgTooltip />
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
import {
  computed,
  defineProps
} from 'vue';
import SvgGreenspark from './SvgGreenspark.vue';
import SvgTooltip from './SvgTooltip.vue';
import {
  ProductWidgetProps,
  SelectedColorType
} from '@/types';
import { useStore } from '@/store'

const store = useStore();
const props = defineProps < ProductWidgetProps > ();
const computedLinked = computed({
  get() {
    return props.linked;
  },
  set(newValue) {
    store.dispatch('products/amendProduct', {
      id: props.id,
      linked: newValue
    });
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
    store.dispatch('products/amendProduct', {
      id: props.id,
      selectedColor: newValue
    });
  }
});
const computedActive = computed({
  get() {
    return props.active;
  },
  set(newValue) {
    if (newValue === true) {
      store.dispatch('products/changeActiveProduct', {
        id: props.id,
        active: newValue
      });
    } else {
      store.dispatch('products/amendProduct', {
        id: props.id,
        active: newValue
      });
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/core/colors.scss';
@import '@/styles/tools/media-queries/above';

.productWidget {
  $block: &;

  &__header {
    display: flex;
    flex-flow: row;
    gap: 24px;
    margin-bottom: 10px;
    padding: 10.3px 11.91px;
    border-radius: 5.95px;
    color: $off-white;
    transition: .25s all ease;

    &--white {
      background-color: $white;
      color: $green;
    }

    &--black {
      background-color: $black;
    }

    &--blue {
      background-color: $blue;
    }

    &--green {
      background-color: $green;
    }

    &--beige {
      background-color: $beige;
      color: $green;
    }

    .icon.logo {
      flex-shrink: 0;
      width: 39.7px;
      height: 45.51px;
    }
  }

  &__title {
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    margin: 0;
    min-height: 21.59px;
    font-size: 12.41px;
    line-height: 15.07px;
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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    box-sizing: border-box;
    opacity: 0;
    z-index: 2;
    cursor: pointer;

    &--checkbox {
      &:hover+.checkbox:before {
        opacity: 0.5;
      }

      &:checked+.checkbox {
        background-color: $green;
        border-color: $green;

        &:before {
          opacity: 0;
        }

        &:after {
          opacity: 1;
        }
      }
    }

    &--radio {
      &:hover+.radio {
        opacity: 0.8;
      }

      &:checked+.radio {
        border: 1.5px solid $border;
      }
    }

    &--toggle {
      &:hover+.toggle-slider .toggle {
        outline: 5.4px solid rgba($light-green, 0.8);
      }

      &:checked+.toggle-slider {
        background-color: $green;

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
    border: 2px solid $black;
    border-radius: 3px;
    box-sizing: border-box;
    cursor: pointer;

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      height: 36px;
      width: 36px;
      opacity: 0;
      z-index: 1;
      background-color: $light-green;
      border-radius: 100%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      transition: .25s all ease;
    }

    &:after {
      content: "✓";
      position: absolute;
      top: -5px;
      left: 1px;
      opacity: 0;
      color: white;
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
      background-color: $blue;
    }

    &--green {
      background-color: $green;
    }

    &--beige {
      background-color: $beige;
    }

    &--white {
      background-color: $white;
    }

    &--black {
      background-color: $black;
    }
  }

  .toggle-slider {
    position: relative;
    display: block;
    height: 20.05px;
    width: 40.11px;
    border-radius: 34.18px;
    box-sizing: border-box;
    background: $off-white;
    border: 0.59px solid $light-green;
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
    background: $off-white;
    border: 0.59px solid $beige;
    box-shadow: 0px 0px 1.1795591115951538px 0px #00000059;
    border-radius: 29.49px;
    transition: .4s;
    box-sizing: border-box;
  }

  &__label {
    font-size: 14px;
    line-height: 17.01px;
    color: $green;
    cursor: pointer;

    &--no-point {
      cursor: auto;
    }
  }

  &__tooltip {
    position: relative;
    top: -3px;

    .icon.tooltip {
      height: 12px;
      width: 12px;
      color: $green;
      cursor: pointer;

      &:hover,
      &:focus {
        ~#{ $block }__tooltipDetails {
          visibility: visible;
          opacity: 1;
          transition: .25s all ease;
          transition-delay: 0s;
          transform: translateX(-55%);

          @include above('tablet-portrait') {
            transform: translateX(-30%);
          }
        }
      }
    }

    #{ $block }__tooltipDetails {
      position: absolute;
      left: 50%;
      padding: 24px 16px 24px 16px;
      width: 248px;
      border-radius: 4px;
      font-size: 14px;
      line-height: 17.01px;
      background-color: $white;
      text-align: center;
      box-shadow: 0px 42px 76px 0px #00000026;
      visibility: hidden;
      opacity: 0;
      z-index: 3;
      transition: .25s all ease;
      transition-delay: .25s;

      &:hover,
      &:focus {
        visibility: visible;
        opacity: 1;
        transform: translateX(-55%);

        @include above('tablet-portrait') {
          transform: translateX(-30%);
        }
      }

      p {
        margin: 0 0 12px;
      }

      a {
        letter-spacing: -2%;
        color: $green;
        text-decoration: none;

        &:hover,
        &:focus {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>

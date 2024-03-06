import { Store } from 'vuex';
import { StateInterface } from './types';

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<StateInterface>;
  }
}

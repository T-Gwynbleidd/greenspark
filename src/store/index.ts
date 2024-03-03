import { InjectionKey } from 'vue';
import {
  useStore as baseUseStore,
  createLogger,
  createStore,
  Store,
} from 'vuex';
import { StateInterface } from '@/types';
import products from './modules/products';

const debug = process.env.NODE_ENV !== 'production';

export const key: InjectionKey<Store<StateInterface>> = Symbol();

export const store = createStore<StateInterface>({
  modules: {
    products,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

export function useStore() {
  return baseUseStore(key);
}

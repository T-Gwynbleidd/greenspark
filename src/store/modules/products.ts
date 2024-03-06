import { Commit } from 'vuex';
import {
  AmendProductInterface,
  ProductWidgetProps,
  ProductsStateInterface,
} from '@/types';
import getProducts from '@/api/products';
import getErrorMessage from '@/util/error';

const debug = process.env.NODE_ENV !== 'production';

// initial state
const state = (): ProductsStateInterface => {
  return {
    allProducts: [],
  };
};

// getters
const getters = {};

// mutations
const mutations = {
  setProducts(
    state: ProductsStateInterface,
    payload: { products: ProductWidgetProps[] }
  ) {
    state.allProducts = payload.products;
  },

  amendProduct(state: ProductsStateInterface, payload: AmendProductInterface) {
    try {
      const product = state.allProducts.find(
        (product) => product.id === payload.id
      );
      if (product) {
        if ('linked' in payload && payload.linked !== undefined) {
          product.linked = payload.linked;
        } else if (
          'selectedColor' in payload &&
          payload.selectedColor !== undefined
        ) {
          product.selectedColor = payload.selectedColor;
        } else if ('active' in payload && payload.active !== undefined) {
          product.active = payload.active;
        }
      } else {
        throw new Error(
          'State mutation: amendProduct. No matching product found.'
        );
      }
    } catch (error) {
      if (debug) {
        // eslint-disable-next-line
        console.error(
          `Store module, products mutation error: ${getErrorMessage(error)}`
        );
      }
    }
  },

  changeActiveProduct(
    state: ProductsStateInterface,
    payload: AmendProductInterface
  ) {
    try {
      state.allProducts.forEach((product) => {
        if (product.id === payload.id) {
          if ('active' in payload && payload.active !== undefined) {
            product.active = payload.active;
          }
        } else {
          product.active = false;
        }
      });
    } catch (error) {
      if (debug) {
        // eslint-disable-next-line
        console.error(
          `Store module, products mutation error: ${getErrorMessage(error)}`
        );
      }
    }
  },
};

// actions
const actions = {
  async getAllProducts({ commit }: { commit: Commit }) {
    const products = await getProducts();
    if (products) {
      commit('setProducts', { products });
    } else {
      if (debug) {
        // eslint-disable-next-line
        console.warn('No products returned by API.');
      }
    }
  },

  async amendProduct(
    { commit }: { commit: Commit },
    payload: AmendProductInterface
  ) {
    if (payload) {
      commit('amendProduct', payload);
    } else {
      if (debug) {
        // eslint-disable-next-line
        console.warn('No product passed to amendProduct action.');
      }
    }
  },

  async changeActiveProduct(
    { commit }: { commit: Commit },
    payload: AmendProductInterface
  ) {
    if (payload) {
      commit('changeActiveProduct', payload);
    } else {
      if (debug) {
        // eslint-disable-next-line
        console.warn('No product passed to changeActiveProduct action.');
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

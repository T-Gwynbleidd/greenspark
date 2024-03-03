import { Commit } from 'vuex';
import { ProductWidgetInterface, ProductsStateInterface } from '@/types';
import getProducts from '@/api/products';

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
    payload: { products: ProductWidgetInterface[] }
  ) {
    state.allProducts = payload.products;
  },

  amendProduct(state: ProductsStateInterface, payload: ProductWidgetInterface) {
    const product = state.allProducts.find(
      (product) => product.id === payload.id
    );
    if (product) {
      product.linked = payload.linked;
      product.selectedColor = payload.selectedColor;
      product.active = payload.active;
    } else {
      throw new Error(
        'State mutation: amendProduct. No matching product found.'
      );
    }
  },
};

// actions
const actions = {
  async getAllProducts({ commit }: { commit: Commit }) {
    const products = await getProducts();
    if (products) {
      commit('setProducts', products);
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

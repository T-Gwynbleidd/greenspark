import { ComponentPublicInstance } from 'vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { createStore } from 'vuex';
import 'cross-fetch/polyfill';
import { StateInterface } from '@/types';
import products from '@/store/modules/products';
import { key } from '@/store';
import App from '@/App.vue';
import ProductWidget from '@/components/ProductWidget.vue';

const store = createStore<StateInterface>({
  modules: {
    products,
  },
});

let wrapper: VueWrapper<any, ComponentPublicInstance<{}, any>>;

beforeEach(() => {
  wrapper = mount(App, {
    attachTo: document.body,
    global: {
      plugins: [[store, key]],
    },
  });
});

afterEach(() => {
  wrapper.unmount();
});

describe('App', () => {
  it('Has a header with a h1 element', () => {
    expect(wrapper.find('header h1').exists()).toBe(true);
  });

  it('Has a default class', () => {
    expect(wrapper.classes('container')).toBe(true);
  });

  it('Has title text that starts with "Per product widgets"', () => {
    const text = 'Per product widgets';
    expect(wrapper.find('header h1').text()).toMatch(new RegExp(`^${text}?`));
  });

  it('Has a main element with a class to contain the widgets', () => {
    expect(wrapper.find('main.widget-container').exists()).toBe(true);
  });

  it('Starts without any ProductWidgets', () => {
    expect(store.state.products.allProducts.length).toBe(0);
    expect(wrapper.findAllComponents(ProductWidget).length).toBe(0);
  });

  it('Renders 3 ProductWidgets after calling the API', async () => {
    await store.dispatch('products/getAllProducts');
    expect(store.state.products.allProducts.length).toBe(3);
    expect(wrapper.findAllComponents(ProductWidget).length).toBe(3);
  });

  it('Correctly updates the state, when clicking the "linked" checkbox of the related state product', async () => {
    const id = 1,
      index = 0,
      initialValue = true,
      changedValue = false;
    await store.dispatch('products/getAllProducts');
    expect(store.state.products.allProducts[index].linked).toBe(initialValue);
    const components = wrapper.findAllComponents(ProductWidget);
    await components[index].find(`#linked-${id}`).trigger('click');
    expect(store.state.products.allProducts[index].linked).toBe(changedValue);
  });

  it('Correctly updates the state, when clicking the "active" checkbox of the related state product', async () => {
    const id = 2,
      index = 1,
      initialValue = false,
      changedValue = true;
    await store.dispatch('products/getAllProducts');
    expect(store.state.products.allProducts[index].active).toBe(initialValue);
    const components = wrapper.findAllComponents(ProductWidget);
    await components[index].find(`#active-${id}`).trigger('click');
    expect(store.state.products.allProducts[index].active).toBe(changedValue);
  });

  it('Correctly updates the state, when clicking the "selectedColor" radio of the related state product', async () => {
    const id = 3,
      index = 2,
      initialValue = 'blue',
      changedValue = 'beige';
    await store.dispatch('products/getAllProducts');
    expect(store.state.products.allProducts[index].selectedColor).toBe(
      initialValue
    );
    const components = wrapper.findAllComponents(ProductWidget);
    await components[index].find(`#beige-${id}`).trigger('click');
    expect(store.state.products.allProducts[index].selectedColor).toBe(
      changedValue
    );
  });

  it('Changes other state products "active" property to false, when setting one to true', async () => {
    const id = 3,
      index = 2,
      initialValue = false,
      changedValue = true;
    await store.dispatch('products/getAllProducts');
    expect(store.state.products.allProducts[index].active).toBe(initialValue);
    const components = wrapper.findAllComponents(ProductWidget);
    await components[index].find(`#active-${id}`).trigger('click');

    store.state.products.allProducts.forEach((product) => {
      if (product.id === id) {
        expect(product.active).toBe(changedValue);
      } else {
        expect(product.active).toBe(false);
      }
    });
  });
});

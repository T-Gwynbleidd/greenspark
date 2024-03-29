import '@testing-library/jest-dom';
import { ComponentPublicInstance } from 'vue';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import { createStore } from 'vuex';
import 'cross-fetch/polyfill';
import { ProductWidgetProps, StateInterface } from '@/types';
import { key } from '@/store';
import products from '@/store/modules/products';
import ProductWidget from '@/components/ProductWidget.vue';

const store = createStore<StateInterface>({
  modules: {
    products,
  },
});
// eslint-disable-next-line
let wrapper: VueWrapper<any, ComponentPublicInstance<{}, any>>;

document.body.innerHTML = `
  <div>
    <h1>Non Vue app</h1>
    <div id="app"></div>
  </div>
`;

beforeEach(() => {
  const intitialProps: ProductWidgetProps = {
    id: 1,
    type: 'plastic bottles',
    amount: 100,
    action: 'collects',
  };
  wrapper = shallowMount(ProductWidget, {
    attachTo: '#app',
    props: intitialProps,
    global: {
      plugins: [[store, key]],
    },
  });
});

afterEach(() => {
  wrapper.unmount();
});

describe('ProductWidget', () => {
  it('Contains an aside element', () => {
    expect(wrapper.find('aside').exists()).toBe(true);
  });

  it('Has a default class', () => {
    expect(wrapper.classes('productWidget')).toBe(true);
  });

  it('Has a header element with a logo', () => {
    expect(wrapper.findComponent({ name: 'SvgGreenspark' }).exists()).toBe(
      true
    );
  });

  it('Has a h3 element in the header', () => {
    expect(wrapper.find('header h3').exists()).toBe(true);
  });

  it('Has title text that starts with "This product collects"', () => {
    const text = 'This product collects';
    expect(wrapper.find('header h3').text()).toMatch(new RegExp(`^${text}?`));
  });

  it('Renders the title text using an action prop', async () => {
    const text = 'This product';
    const action = 'plants';
    await wrapper.setProps({ action });
    expect(wrapper.find('header h3').text()).toMatch(
      new RegExp(`^${text} ${action}?`)
    );
  });

  it('Has a span element within the title', () => {
    expect(wrapper.find('header h3 span').exists()).toBe(true);
  });

  it('Has span text within the title that says "100 plastic bottles"', () => {
    const text = '100 plastic bottles';
    expect(wrapper.find('header h3 span').text()).toBe(text);
  });

  it('Renders the span text using amount & type props', async () => {
    const amount = 10;
    const type = 'trees';
    await wrapper.setProps({ type, amount });
    expect(wrapper.find('header h3 span').text()).toBe(`${amount} ${type}`);
  });

  it('Renders the span text with "kgs of" if the type prop is "carbon"', async () => {
    const amount = 60;
    const type = 'carbon';
    await wrapper.setProps({ type, amount });
    expect(wrapper.find('header h3 span').text()).toBe(
      `${amount}kgs of ${type}`
    );
  });

  it('Has a checkbox called "linked",', () => {
    expect(wrapper.find('input[type=checkbox][name=linked]').exists()).toBe(
      true
    );
  });

  it('This "linked" checkbox has a label that includes matching text', () => {
    const text = 'Link to Public Profile';
    expect(wrapper.find('label[for^=linked-]').text()).toMatch(
      new RegExp(`^${text}?`)
    );
  });

  it('Defaults the "linked" checkbox to false', async () => {
    expect(
      wrapper.vm.$el.querySelector('input[type=checkbox][name=linked]').checked
    ).toBe(false);
  });

  it('Checks the "linked" checkbox if the "linked" prop is true', async () => {
    const linked = true;
    await wrapper.setProps({ linked });
    expect(
      wrapper.vm.$el.querySelector('input[type=checkbox][name=linked]').checked
    ).toBe(true);
  });

  // NOTE: The below tooltip tests do not work as expected
  // I belive there's an issue with the configuration, that doesn't pick up the css styles applied to the HTML element
  // Tried with both vue-test-util and jest-dom
  it.todo('The tooltip details are hidden by default');
  // , () => {
  //   expect(
  //     wrapper.vm.$el.querySelector('.productWidget__tooltipDetails')
  //   ).not.toBeVisible();
  // });

  it.todo('Hovering the tooltip displays the details');
  // , async () => {
  //   await wrapper.find('.icon.tooltip').trigger('mouseover');
  //   expect(
  //     wrapper.vm.$el.querySelector('.productWidget__tooltipDetails')
  //   ).toBeVisible();
  // });

  it('Has a radio input called "badge_colour", and has five of them', () => {
    expect(wrapper.find('input[type=radio][name^=badge_colour]').exists()).toBe(
      true
    );
    expect(wrapper.findAll('input[type=radio]').length).toBe(5);
  });

  it('The "badge_colour" radio group has a label that includes matching text', () => {
    const text = 'Badge colour';
    expect(wrapper.find('label[for^=badge_colour]').text()).toMatch(
      new RegExp(`^${text}?`)
    );
  });

  it('The default selection is that "badge_colour" radio input is white', () => {
    const radioInputs = wrapper.vm.$el.querySelectorAll('input[type=radio]');
    radioInputs.forEach((radio: { value: string; checked: boolean; }) => {
      if (radio.value === 'white') {
        expect(radio.checked).toBe(true);
      } else {
        expect(radio.checked).toBe(false);
      }
    });
  });

  it('Checks the correct "badge_colour" radio input based on the "selectedColor" prop value', async () => {
    const selectedColor = 'beige';
    await wrapper.setProps({ selectedColor });
    const radioInputs = wrapper.vm.$el.querySelectorAll('input[type=radio]');
    radioInputs.forEach((radio: { value: string; checked: boolean; }) => {
      if (radio.value === selectedColor) {
        expect(radio.checked).toBe(true);
      } else {
        expect(radio.checked).toBe(false);
      }
    });
  });

  it('Defaults the color of the header to white when there is no "selectedColor" prop provided', () => {
    expect(
      wrapper
        .find('.productWidget__header')
        .classes('productWidget__header--white')
    ).toBe(true);
  });

  it('Sets the color of the header based on the "selectedColor" prop provided', async () => {
    const selectedColor = 'beige';
    await wrapper.setProps({ selectedColor });
    expect(
      wrapper
        .find('.productWidget__header')
        .classes(`productWidget__header--${selectedColor}`)
    ).toBe(true);
  });

  it('Changes the color of the header based on the "badge_colour" radio input selected', async () => {
    let selectedColor = 'beige';
    await wrapper.setProps({ selectedColor });
    expect(
      wrapper
        .find('.productWidget__header')
        .classes(`productWidget__header--${selectedColor}`)
    ).toBe(true);

    selectedColor = 'green';
    await wrapper.setProps({ selectedColor });
    expect(
      wrapper
        .find('.productWidget__header')
        .classes(`productWidget__header--${selectedColor}`)
    ).toBe(true);
  });

  it('Has a checkbox called "active",', () => {
    expect(wrapper.find('input[type=checkbox][name=active]').exists()).toBe(
      true
    );
  });

  it('This "active" checkbox has a label that includes matching text', () => {
    const text = 'Activate Badge';
    expect(wrapper.find('label[for^=active-]').text()).toMatch(
      new RegExp(`^${text}?`)
    );
  });

  it('Defaults the "active" checkbox to false', async () => {
    expect(
      wrapper.vm.$el.querySelector('input[type=checkbox][name=active]').checked
    ).toBe(false);
  });

  it('Checks the "active" checkbox if the "active" prop is true', async () => {
    const active = true;
    await wrapper.setProps({ active });
    expect(
      wrapper.vm.$el.querySelector('input[type=checkbox][name=active]').checked
    ).toBe(true);
  });
});

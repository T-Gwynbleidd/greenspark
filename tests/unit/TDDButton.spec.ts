import { VueWrapper, shallowMount } from '@vue/test-utils';
import TDDButton from '@/components/TDDButton.vue';
import { ComponentPublicInstance } from 'vue';

let wrapper: VueWrapper<any, ComponentPublicInstance<{}, any>>;
// Mount the component to make a wrapper before each test
beforeEach(() => {
  wrapper = shallowMount(TDDButton);
});

// Destroy the component wrapper after each test
afterEach(() => {
  wrapper.unmount();
});

describe('TDDButton', () => {
  // Checking if the component contains a 'button' element
  it('Contains a button element', () => {
    expect(wrapper.find('button').exists()).toBe(true);
  });

  // Checking if the component renders the label on the 'button' element
  it('Renders button text using a label prop', async () => {
    const label = 'Call to action';
    await wrapper.setProps({ label });
    expect(wrapper.text()).toBe(label);
  });

  // Checking if the component has the default 'TDDButton' class
  it('Has default button styles', () => {
    expect(wrapper.classes('TDDButton')).toBe(true);
  });

  // Checking if the component has the 'primary' class when 'primary'
  // is the value of the 'type' propery
  it('Has primary styles', async () => {
    const type = 'primary';

    await wrapper.setProps({ type });
    expect(wrapper.classes(type)).toBe(true);
  });

  // Checking if a 'click' event is emitted when the component is clicked
  it('Emits a click event when clicked', () => {
    wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });
});

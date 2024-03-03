import { ComponentPublicInstance } from 'vue';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import ProductWidget from '@/components/ProductWidget.vue';

let wrapper: VueWrapper<any, ComponentPublicInstance<{}, any>>;

beforeEach(() => {
  const intitialProps = {
    id: 1,
    type: 'plastic bottles',
    amount: 100,
    action: 'collects',
  };
  wrapper = shallowMount(ProductWidget, {
    attachTo: document.body,
    props: intitialProps,
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
    expect(wrapper.find('header img').exists()).toBe(true);
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
    expect(
      wrapper.find('input[type=checkbox][name=linked]+label').text()
    ).toMatch(new RegExp(`^${text}?`));
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

  it.todo('The tooltip details are hidden by default');
  // Looking at vue test util docs, the below should code should work, but doesn't
  // , () => {
  //   expect(wrapper.find('.productWidget__tooltipDetails').isVisible()).toBe(
  //     false
  //   );
  // });

  it.todo('Hovering the tooltip displays the details');
  // Looking at vue test util docs, the below should code should work, but doesn't
  // , async () => {
  //   await wrapper.find('.icon.tooltip').trigger('mouseover');
  //   expect(wrapper.find('.productWidget__tooltipDetails').isVisible()).toBe(
  //     true
  //   );
  // });

  it('Has a a radio input called "badge_colour", and has five of them', () => {
    expect(wrapper.find('input[type=radio][name=badge_colour]').exists()).toBe(
      true
    );
    expect(wrapper.findAll('input[type=radio]').length).toBe(5);
  });

  it('The "badge_colour" radio group has a label that includes matching text', () => {
    const text = 'Badge colour';
    expect(wrapper.find('label[for=badge_colour]').text()).toMatch(
      new RegExp(`^${text}?`)
    );
  });

  it('The default is that all "badge_colour" radio inputs are false', () => {
    const radioInputs = wrapper.vm.$el.querySelectorAll('input[type=radio]');
    radioInputs.forEach((radio: any) => {
      expect(radio.checked).toBe(false);
    });
  });

  it('Checks the correct "badge_colour" radio input based on the "selectedColor" prop value', async () => {
    const selectedColor = 'beige';
    await wrapper.setProps({ selectedColor });
    const radioInputs = wrapper.vm.$el.querySelectorAll('input[type=radio]');
    radioInputs.forEach((radio: any) => {
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
    expect(
      wrapper.find('input[type=checkbox][name=active]+label').text()
    ).toMatch(new RegExp(`^${text}?`));
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

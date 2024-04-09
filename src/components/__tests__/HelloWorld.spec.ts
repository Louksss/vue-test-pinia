import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import TestComponent from '../TestComponent.vue';
import Helloworld from '../Helloworld.vue';
import useSum from '../../composables/sum';

describe('TestComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(TestComponent, { props: { msg: 'Hello Vitest', number: 4 } })
    const numberSelector='[data-testid=number]';
    const msgSelector='[data-testid=msg]';

    console.log(wrapper);
    expect(wrapper.text()).toBe('Hello Vitest' + 4)
    // expect(wrapper.find(msgSelector).text()).toBe('Hello Vitest')
    // expect(wrapper.find(numberSelector).text()).toBe(4)
  })
})

const { sum, sort } = useSum();

describe('sum', () => {
  it('returns a correct result', () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });
})

describe('sort', () => {
  it('returns a correct result', () => {
    const result = sort([4,3,9,1]);
    expect(result).toStrictEqual([1,3,4,9]);
  });
})

import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import HelloWorld from '../HelloWorld.vue';
import useSum from '../../composables/sum';

// describe('HelloWorld', () => {
//   it('renders properly', () => {
//     const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })

//     console.log(wrapper.text());
//     expect(wrapper.text()).toContain('Hello Vitest')
//   })
// })

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

import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import TestComponent from '../TestComponent.vue';
import HelloWorld from '../HelloWorld.vue';
import useSum from '../../composables/sum';
import { createTestingPinia } from '@pinia/testing';

describe('TestComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(TestComponent, { props: { msg: 'Hello Vitest', number: 4 } })

    console.log(wrapper);
    expect(wrapper.text()).toBe('Hello Vitest' + 4)
  })
})

describe("HelloWorld", () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              landlord: {
                landlordList: [
                  {
                    id: 1,
                    first_name: 'John',
                    last_name: 'Doe',
                  }
                ]
              },
              tenant: {
                tenantList: [
                  {
                      id: 1,
                      first_name: 'Lucas',
                      last_name: 'Fillancq',
                      landlord: 1
                  },
                  {
                      id: 2,
                      first_name: 'Hortense',
                      last_name: 'Vermes',
                      landlord: 2
                  },
                  {
                      id: 3,
                      first_name: 'Valentin',
                      last_name: 'Levier',
                      landlord: 1
                  }
                ],
              },
            },
          }),
        ],
      },
      props: {
        msg: "Let's search for a landlord",
      }
    });

    expect(wrapper.find('#landlord1').text()).toBe('1. John Doe');
  });
});

// describe("Button clicked", async () => {
//   expect(HelloWorld).toBeTruthy();

//   const wrapper = mount(HelloWorld, {
//     props: {
//       msg: "Let's search for a landlord",
//     },
//   });
//   const verifyClick = await wrapper.get("button").trigger("click");
//   expect(wrapper.vm.user.search).toEqual(null);
// });

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

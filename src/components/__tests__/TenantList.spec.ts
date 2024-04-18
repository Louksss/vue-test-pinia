import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import TenantList from '../TenantList.vue';
import { createTestingPinia } from '@pinia/testing';
import { useTenantStore } from "@/stores/tenant-store";


describe('TenantList', () => {
    it('renders properly', () => {
      const wrapper = mount(TenantList, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
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
            landlordId: 1
        }
      })
  
        console.info(wrapper.text());
        expect(wrapper.text()).toBe('Lucas FillancqValentin Levier');
    })

    it('renders empty properly', () => {
        const wrapper = mount(TenantList, {
          global: {
            plugins: [
              createTestingPinia({
                initialState: {
                  tenant: {
                    tenantList: [],
                  },
                },
              }),
            ],
          },
          props: {
              landlordId: 1
          }
        })
    
        console.info('empty : ', wrapper.text());
        expect(wrapper.text()).toBe('No tenants');
      })
  })
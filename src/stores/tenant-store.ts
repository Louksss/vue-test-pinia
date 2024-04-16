import { defineStore } from "pinia";

export const GENDER = {
    MALE: 'Male',
    FEMALE: 'Female',
    UNDEFINED: 'Prefer not to say'
  } as const
  
export type Gender = typeof GENDER;

export interface Tenant {
  id: number;
  gender?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  landlord?: number;
}

export const useTenantStore = defineStore('tenant', {
  state: () => ({
    tenantList: [] as Tenant[],
    tenantById: new Map() as Map<number, Tenant>
  }),
  getters: {
    getTenants: (state) => state.tenantList,
    getById: (state) => {
      return (id: number) => state.tenantById.get(id)   
    },
    getByLandlord: (state) => {
        return (id: number) => state.tenantList.filter((tenant: Tenant) => {
            return id === tenant.landlord;
        })  
      },
  },
  actions: {
    retrieveTenants(list: Tenant[]) {
      this.tenantList = list;
      for (const tenant of this.tenantList) {
        this.tenantById.set(tenant.id, tenant);
      }
    },
    addTenant(tenant: Tenant) {
      this.tenantList.push(tenant);
      this.tenantById.set(tenant.id, tenant);
    }
  },
});

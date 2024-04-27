<template>
  <div class="tenants">
    <h1>Tenants by landlord :</h1>
    <div class="tenant_form">
      <label>First name:</label>
      <input type="text" name="first_name" v-model="first_name" />
      <label>Last name:</label>
      <input type="text" name="last_name" v-model="last_name"/>
      <label>Gender:</label>
      <select v-model="gender" name="gender">
        <option disabled value="">Please select one</option>
        <option>{{GENDER.FEMALE}}</option>
        <option>{{GENDER.MALE}}</option>
        <option>{{GENDER.UNDEFINED}}</option>
      </select>

      <label>Landlord Id:</label>
      <input type="number" name="landlord_id" v-model="landlordId" min="1" :max="landlords.length"/>
      <button :disabled="disableAdd" @click="addTenant" id="add_tenant">Add</button>
    </div>
    <div v-for="landlord in landlords" :key="landlord.id">
      <h3>{{landlord.first_name}} {{landlord.last_name}}'s tenant(s) : </h3>
      <tenant-list :landlord-id="landlord.id" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TenantList from '../components/TenantList.vue';
import { LandLord, useLandlordStore } from '../stores/landlord-store';
import { GENDER, Tenant, useTenantStore } from '../stores/tenant-store';

export default defineComponent({
  components: {
    TenantList
  },
  setup() {
    const store = useLandlordStore();
    const tenantStore = useTenantStore();
    const first_name = ref<string>('');
    const last_name = ref<string>('');
    const gender = ref<string>(null);
    const landlordId = ref<number>(null);

    return { store, tenantStore, first_name, last_name, gender, landlordId, GENDER }
  },
  computed: {
    landlords(): LandLord[] {
      return this.store.getLandlords;
    },
    tenantsNb(): number {
      return this.tenantStore.getTenants.length;
    },
    disableAdd(): boolean {
      return !this.landlordId || !this.first_name.length || !this.last_name.length;
    }
  },
  methods: {
    addTenant() {
      const newTenant: Tenant = {
        id: this.tenantsNb + 1,
        gender: this.gender ?? GENDER.UNDEFINED,
        first_name: this.first_name,
        last_name: this.last_name,
        landlord: this.landlordId
      };

      this.tenantStore.addTenant(newTenant);
      this.clear();
    },
    clear() {
      this.first_name = '';
      this.last_name = '';
      this.gender = null;
      this.landlordId = null;
    },
  }
})
</script>


<style>
h3 {
  margin-top: 24px;
}

.tenant_form {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
}

.tenant_form button {
  margin-top: 8px;
}

@media (min-width: 1024px) {
  .tenants {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

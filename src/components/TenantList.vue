<template>
  <div v-if="tenants.length">
    <div v-for="tenant in tenants" :key="tenant.id">{{tenant.first_name}} {{tenant.last_name}}</div>
  </div>
  <div v-else>No tenants</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Tenant, useTenantStore } from '../stores/tenant-store';

export default defineComponent({
    props: {
        landlordId: {
            type: Number,
            required: true
        }
    },
    setup() {
        const tenantStore = useTenantStore();

        return { tenantStore }
    },
    computed: {
        tenants(): Tenant[] {
            return this.tenantStore.getByLandlord(this.landlordId);
        },
    },
})
</script>
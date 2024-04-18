<template>
  <div class="house-card" @click="toggleTenants">
    <h3>{{landlord.first_name}} {{landlord.last_name}}'s house : </h3>
    <img :src="house" width="400" height="150"/>
    <div class="tenant-dropdown" v-if="showTenants">
        <div>
            <span class="bold">{{tenants.length ? 'House tenants : ' : 'No tenants yet'}}</span> 
            <span v-if="boys_nb">{{boys_nb}} ♂</span> 
            <span v-if="girls_nb"> {{girls_nb}} ♀</span> 
            <span v-if="unknown_genders_nb"> {{unknown_genders_nb}} ?</span>
        </div>
        <div v-for="tenant in tenants" :key="tenant.id" class="tenant-list">{{tenant.first_name}} {{tenant.last_name}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { LandLord, useLandlordStore } from '../stores/landlord-store';
import { GENDER, Tenant, useTenantStore } from '../stores/tenant-store';

export default defineComponent({
    props: {
        landlordId: {
            type: Number,
            required: true
        }
    },
    setup() {
        const landlordStore = useLandlordStore();
        const tenantStore = useTenantStore();
        const showTenants = ref<boolean>(false);

        return { landlordStore, tenantStore, showTenants }
    },
    computed: {
        landlord(): LandLord {
            return this.landlordStore.getById(this.landlordId);
        },
        house(): string {
            return this.landlord.house;
        },
        tenants(): Tenant[] {
            return this.tenantStore.getByLandlord(this.landlordId);
        },
        boys_nb(): number {
            return this.tenants.filter((tenant: Tenant) => {
                return tenant.gender === GENDER.MALE;
            }).length
        },
        girls_nb(): number {
            return this.tenants.filter((tenant: Tenant) => {
                return tenant.gender === GENDER.FEMALE;
            }).length
        },
        unknown_genders_nb(): number {
            return this.tenants.filter((tenant: Tenant) => {
                return tenant.gender === GENDER.UNDEFINED;
            }).length
        }
    },
    methods: {
        toggleTenants() {
            this.showTenants = !this.showTenants;
        }
    }
})
</script>

<style scoped>
h3 {
    margin-top: 8px;
}

.house-card {
    width: 420px;
    border: 1px solid grey;
    border-radius: 8px;
    padding: 8px;
    margin-bottom: 16px;
}

.house-card:hover {
    background-color: rgb(183, 230, 214);
    cursor: pointer;
}

.tenant-dropdown {
    border-top: 1px solid grey;
    padding: 8px;
}

.tenant-dropdown .tenant-list {
    padding-left: 16px;
}

.bold {
  font-weight: 600;
}
</style>
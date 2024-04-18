<template>
  <div class="greetings">
    <TestComponent :msg="msg"></TestComponent>
    <div v-for="landlord in landlords" :key="landlord.id" :id="`landlord${landlord.id}`">
      {{landlord.id}}. {{landlord.first_name}} {{landlord.last_name}}
    </div>
    <div class="form">
      <label>First name:</label>
      <input type="text" v-model="first_name" />
      <label>Last name:</label>
      <input type="text" v-model="last_name"/>
      <button @click="addLandlord" :disabled="disableAdd">Add</button>
    </div>

    <div class="search">
      <label>Landlord Id:</label>
      <input type="number" v-model="id" min="0" :max="landlords.length"/>
      <button @click="searchLandlord" type="button">Search</button>

      <div v-if="searched_id > 0">
        <span class="bold">Landlord :</span> <span> {{searched_landlord.id}}. {{searched_landlord.first_name}} {{searched_landlord.last_name}}</span>
      </div>
      <div v-if="searched_id && tenants.length" class="tenant-list">
        <span class="bold">Tenants :</span> <span v-for="(tenant, index) in tenants" :key="index">{{tenant.first_name}} {{tenant.last_name}}, </span>
      </div>
      <div>
        <span v-if="boys_nb">{{boys_nb}} ♂</span> 
        <span v-if="girls_nb">{{girls_nb}} ♀</span> 
        <span v-if="unknown_genders_nb">{{unknown_genders_nb}} ?</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { LandLord, useLandlordStore } from '../stores/landlord-store';
import { GENDER, Tenant, useTenantStore } from '../stores/tenant-store';

export default defineComponent({
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup() {
    const store = useLandlordStore();
    const tenantStore = useTenantStore();
    const first_name = ref<string>('');
    const last_name = ref<string>('');
    const searched_id = ref<number>(0);
    const id = ref<number>(null);

    return { store, tenantStore, first_name, last_name, searched_id, id }
  },
  computed: {
    landlords(): LandLord[] {
      return this.store.getLandlords;
    },
    disableAdd(): boolean {
      return !this.first_name.length || !this.last_name.length;
    },
    searched_landlord(): LandLord {
      return this.store.getById(this.searched_id);
    },
    tenants(): string[] {
      return this.tenantStore.getByLandlord(this.searched_id);
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
  mounted() {
    const landlordList: LandLord[] = [
      {id: 1, first_name: 'Lucas', last_name: 'Fillancq', house: 'src/assets/house1.jpg'},
      {id: 2, first_name: 'Ines', last_name: 'Manach', house: 'src/assets/house2.jpg'},
      {id: 3, first_name: 'Hortense', last_name: 'Vermes', house: 'src/assets/house3.jpg'},
    ];

    const tenantList: Tenant[] = [
      {id: 1, first_name: 'Enora', last_name: 'Gautier', landlord: 1, gender: GENDER.FEMALE},
      {id: 2, first_name: 'Victoria', last_name: 'Stassi', landlord: 1, gender: GENDER.FEMALE},
      {id: 3, first_name: 'Paul', last_name: 'Cottineau', landlord: 1, gender: GENDER.MALE},
    ];
    this.store.retrieveLandlords(landlordList);
    this.tenantStore.retrieveTenants(tenantList);
  },
  methods: {
    addLandlord() {
      const newLandlord: LandLord = {
        id: this.landlords.length + 1,
        first_name: this.first_name,
        last_name: this.last_name
      };

      this.store.addLandlord(newLandlord);
      this.clear();
    },
    clear() {
      this.first_name = '';
      this.last_name = '';
    },
    searchLandlord() {
      this.searched_id = this.id;
    }
  }
})
</script>


<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

.form {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
}

.form button {
  margin-top: 8px;
}

.search {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
}

.search button {
  margin: 8px 0;
}

.tenant-list {
  margin-top: 8px;
}

.bold {
  font-weight: 600;
}
</style>

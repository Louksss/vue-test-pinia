<template>
  <div class="greetings">
    <TestComponent :msg="msg"></TestComponent>
    <div v-for="landlord in landlords" :key="landlord.id">
      {{landlord.id}}. {{landlord.first_name}} {{landlord.last_name}}
    </div>
    <div class="form">
      <label>First name:</label>
      <input type="text" v-model="first_name" />
      <label>Last name:</label>
      <input type="text" v-model="last_name"/>
      <button @click="addLandlord">Add</button>
    </div>

    <div class="search">
      <label>First name:</label>
      <input type="number" v-model="id" min="0" :max="landlords.length"/>
      <button @click="searchLandlord">Search</button>

      <div v-if="searched_id > 0">
        {{searched_landlord.id}}. {{searched_landlord.first_name}} {{searched_landlord.last_name}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { LandLord, useLandlordStore } from '../stores/landlord-store';

export default defineComponent({
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup() {
    const store = useLandlordStore();
    const first_name = ref<string>('');
    const last_name = ref<string>('');
    const searched_id = ref<number>(0);
    const id = ref<number>(null);

    return { store, first_name, last_name, searched_id, id }
  },
  computed: {
    landlords(): LandLord[] {
      return this.store.getLandlords;
    },
    searched_landlord(): LandLord {
      return this.store.getById(this.searched_id);
    }
  },
  mounted() {
    const landlordList: LandLord[] = [
      {id: 1, first_name: 'Lucas', last_name: 'Fillancq'},
      {id: 2, first_name: 'Ines', last_name: 'Manach'},
      {id: 3, first_name: 'Hortense', last_name: 'Vermes'},
    ];
    this.store.retrieveLandlords(landlordList);
  },
  methods: {
    addLandlord() {
      const newLandlord: LandLord = {
        id: this.landlords.length + 1,
        first_name: this.first_name,
        last_name: this.last_name
      };

      this.store.addLandlord(newLandlord);
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
</style>
